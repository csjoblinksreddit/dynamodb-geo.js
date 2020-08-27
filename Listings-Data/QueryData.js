const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
require('dotenv').config()

// Set up AWS
AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-1'
});

// Use a local DB for the example.
const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('https://dynamodb.us-east-1.amazonaws.com') });

// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'CrimeData');

// Instantiate the table manager
const tableManager = new ddbGeo.GeoDataManager(config);

console.log('Querying by radius, looking 1mile from Cambridge, UK.');
tableManager.queryRadius({
    RadiusInMeter: 1600.34,
    CenterPoint: {
        latitude: 37.72694991292525,
        longitude: -122.47603947349434
    }
}).then(results => {
    console.log(results);
})
.catch(console.warn)