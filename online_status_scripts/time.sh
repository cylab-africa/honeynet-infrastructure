while :;

do
    lsusb | grep "Qualcomm, Inc. Siemens SG75"
    rc=$?

    if [[ $rc -eq 0 ]] ; then
        ipaddr=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
        allModems=$(lsusb | grep -c "Qualcomm") # Total number of modems connected
        workingModems=$(lsusb | grep -c "Qualcomm, Inc. Siemens SG75") # Total number of modems in the GSM state
        dateTime=$(date +"%Y-%m-%d %H:%M:%S")

        cat /home/pi/online_status_scripts/insert.sql | sed  "s/currentip/$ipaddr/g; s/total/$allModems/g; s/working/$workingModems/g;  s/day/$dateTime/g" > /tmp/insert
        mysql -h <'host_ip'> -u <'host_name'> -p<'password'> < /tmp/insert

        sleep 600 ;

    else
        ipaddr=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
        allModems=$(lsusb | grep -c "Qualcomm") # Total number of modems connected
        workingModems=$(lsusb | grep -c "Qualcomm, Inc. Siemens SG75") # Total number of modems in the GSM state
        dateTime=$(date -d "15 minutes ago" +"%Y-%m-%d %H:%M:%S")

        cat /home/pi/online_status_scripts/insert.sql | sed  "s/currentip/$ipaddr/g; s/total/$allModems/g; s/working/$workingModems/g;  s/day/$dateTime/g" > /tmp/insert
        mysql -h <'host_ip'> -u <'host_name'> -p<'password'> < /tmp/insert

        sleep 600;
    fi
done