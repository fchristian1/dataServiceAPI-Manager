import express from "express"
import cors from "cors"


const app = express();

app.use(cors());

app.get("/", (req,res)=>{
	console.log("health-enpoint call");
	res.json( {
		"message":"ok",
		"goto":"/api/v1/"
	} );
});

let data = [
	{
		tableName:"data",
		data:[
			1,2,3,4,5,6,7,8,9,0
		]
	},
	{
		tableName:"users",
		data:[
			{
				firstname:"Christian",
				lastname:"Fröchtenicht",
				age:42
			},
			{
				firstname:"Martin",
				lastname:"Kraft",
				age:46
			},
			{
				firstname:"Sabine",
				lastname:"Bormann",
				age:44
			}
		]
	}
]

app.get("/api/v1/", (req,res)=>{
	console.log("getall tablenames");
	let tables = {
		"tableNames":data.map((d)=> d.tableName),
		"paths":data.map((d)=>"/api/v1/" + d.tableName)
	};

	res.json(tables ?? {message:"no tables"});
});

app.get("/api/v1/:table/" ,(req,res)=>{
        console.log("getall call");
	
	let table = data.filter((d)=>d.tableName == req.params.table)[0] ?? {"message":"no table with: " + req.params.table};

	res.json(table.data ?? table);

});

app.get("/api/v1/:table/:key/:value", (req,res)=>{
        console.log("getonebyid call");
	let table = data.filter((d)=>d.tableName == req.params.table)[0];
	if(req.params.key == "index"){
		return res.json(table.data[req.params.value]);
	}
	
	res.json(table.data.filter((d)=>{
		console.log(req.params.key, d[req.params.key], req.params.value, d);
		return String(d[req.params.key]).includes(req.params.value)
	}));
});

app.post("/api/v1/:table/", (req,res)=>{
        console.log("post call");
	res.json({"message":"post"})
});

app.put("/api/v1/:table/:id", (req, res)=>{
        console.log("put call");
	res.json({"message":"put"});
});
app.delete("/api/v1/:table/:id",(req,res)=>{
	console.log("delete call");
	res.json({"message":"delete"});
});


app.listen( 3000, ()=>{
	console.log("api is listen on port 3000");
});

