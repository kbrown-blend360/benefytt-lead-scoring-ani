const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const getItem = async (event) => {
  //default success
  var message = "success"

  var params = {
    TableName: "ani",
    Key:{
      "ani": event.ani,
    }
  }
  
  let item, business_line;

  var docClient = new AWS.DynamoDB.DocumentClient();
  
  await docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
      message = "error"
    } else {
      //success retrieval

      console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
      item = data
      business_line = data.business_line // togetherhealth or go health
    }
  })

  return { 
    message,
    item,
    event
  }

};


module.exports = getItem;
