<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "raspisms";

//remote server info
$rservername = <'ip_address_of_remote_host'>;
$rusername = <'name_of_remote_user'>;
$rpassword = <'password_of_remote_user'>;
$rdbname = <'name_of_remote_database'>;
$PiID = <'id_of_pi'>;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection to local database failed: " . $conn->connect_error);
}

//connection to remote server
$rconn = new mysqli($rservername, $rusername, $rpassword, $rdbname);

if ($rconn->connect_error) {
    die("Connection to remote database failed: " . $rconn->connect_error);
}

$sql =
    "select at, text, origin, command, status, id_user, id_phone, mms, created_at from received where updated_at is null ";
$result = $conn->query($sql);

$insert_qry =
    "insert into received(at, text, origin, command, status, id_user, id_phone, mms, created_at, pi_id) values ";

$row_count = 0;

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        if ($row_count > 0) {
            $insert_qry .= ",";
        }

        $row_count += 1;
        $insert_qry .=
            "('" .
            refine($row["at"]) .
            "','" .
            ref_str($row["text"]) .
            "','" .
            refine($row["origin"]) .
            "'," .
            refine($row["command"]) .
            ",'" .
            refine($row["status"]) .
            "'," .
            refine($row["id_user"]) .
            "," .
            refine($row["id_phone"]) .
            "," .
            refine($row["mms"]) .
            ",'" .
            refine($row["created_at"]) .
            "','" .
            refine($PiID) .
            "')";
    }

    //insert data into remote
    if (mysqli_query($rconn, $insert_qry)) {
        echo "Uploaded " . $row_count . " record(s) to remote server.";
        shell_exec("bash /home/pi/cronscripts/delete_sms.sh");
        
        //update local database
        $update_qry = "update received set updated_at=current_date()";
        if ($conn->query($update_qry) === true) {
            echo "Local database updated successfully\n";
        } else {
            echo "Error updating local database: " . $conn->error;
        }
    } else {
        echo "Error: " . $insert_qry . "<br>" . mysqli_error($rconn);
    }
}

$conn->close();
$rconn->close();

function refine($col)
{
    if (is_null($col) == 1 || !isset($col) || strlen($col) == 0) {
        return "NULL";
    }

    return $col;
}

function ref_str($col)
{
    $rcol = refine($col);

    //escape ' in text
    return str_replace("'", "\'", $rcol);
}
?>
