// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO UserJanetEssienJohn2021 
                 (ID, COUNTRY, FIRST_NAME, LAST_NAME, Email, PASSWORD, PHONE, CREATED_DT)
                 VALUES 
                 ('1', 'Nigeria',  'Ugo', 'Parker' , 'ugoparker27@gmail.com', 'ugo2020', '08182223345', '2021-02-21'),
                 ('2', 'Brazil', 'Janet', 'John' , 'Janetjohn@gmail.com', 'Janet23', '09023445553',  '2021-01-21'),
                 ('3', 'Ghana',  'George', 'George', 'Georgesketch23@gmail.com', 'george22', '09036522526',  '2021-01-21')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation', err);
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;