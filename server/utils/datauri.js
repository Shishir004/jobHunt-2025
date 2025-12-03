const DatauriParser=require('datauri/parser.js')
const path=require("path");
const getDatauri=(file)=>{
    const parser=new DatauriParser();
    const extName=path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}
module.exports= getDatauri;