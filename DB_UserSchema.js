const userSchema = `
CREATE TABLE IF NOT EXISTS reginfo (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
`;

module.exports = userSchema;