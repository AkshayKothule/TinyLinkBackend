
const pool=require("../dataconfig/dbConnection")


//get method 

exports.linksList = (req, resp) => {
  pool.query("SELECT * FROM links", (err, result) => {
    if (err) {
      resp.status(404).json({ message: "error occurred" });
    } else {
      resp.status(200).json({ data: result.rows });
    }
  });
};



 //post method 

    function isValidUrl(url) {
    try {
        new URL(url);
        return true;   // URL is valid
    } catch (err) {
        return false;  // URL is invalid
    }
}


exports.addLink = (req, resp) => {
    const { code, url } = req.body;

    console.log(code + " " + url);

    // 1. Validate URL
    if (!isValidUrl(url)) {
        return resp.status(400).json({ message: "Invalid URL format!" });
    }

    // Check if URL already exists
    pool.query(
        "SELECT * FROM links WHERE url = $1",
        [url],
        (err2, result2) => {
            if (err2) {
                console.log(err2);
                return resp.status(500).json({ message: "Server error" });
            }

            if (result2.rows.length > 0) {
                return resp.status(409).json({ message: "URL already shortened!" });
            }

            //Insert into DB
            pool.query(
                "INSERT INTO links (code, url) VALUES ($1, $2)",
                [code, url],
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return resp.status(400).json({ message: "Failed to insert" });
                    }

                    return resp.status(200).json({ message: "Inserted successfully" });
                }
            );
        }
    );  // <<< This closing bracket was missing
};

//Status get for one code
exports.singleLinks=(req , resp)=>{
    pool.query("select * from links where code=$1",[req.params.code],(error , result)=>{
        if(error){
            resp.status(404).json({message:"invaild code "});
        }else{
            resp.status(200).json({data:result.rows})
        }

    })

}

//delete links
exports.deleteLink=(req , resp)=>{
    pool.query("delete from links where code=$1" , [req.params.code],(error , result)=>{

        if(error){
            console.log(error);
            resp.status(404).json({message:"invalid code for delete "})
        }else{
            resp.status(200).json({message:"sucessfuly deleted !!!!!!!!"});
        }
    })

}


