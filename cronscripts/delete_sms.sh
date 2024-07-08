#!/bin/bash

num_of_configuration_files=$(ls /etc | grep -c gammu_conf)
echo $num_of_configuration_files

for ((j = 0; j < num_of_configuration_files; j++))
do
    file="gammu_conf_$((j+1)).rc"
    echo $file

    result_1=$(sudo gammu -c "/etc/$file" deleteallsms 1)
    for ((i = 0; i < 10; i++))
    do
        if [ "$result_1" = "Error opening device. Unknown, busy or no permissions." ]
        then
            result_1=$(sudo gammu -c "/etc/$file" deleteallsms 1)
            sleep 3
        else
            echo "Sim card messages deleted successfully"
            continue
        fi
    done

    result_2=$(sudo gammu -c "/etc/$file" deleteallsms 3)
    for ((i = 0; i < 10; i++))
    do
        if [ "$result_2" = "Error opening device. Unknown, busy or no permissions." ]
        then
            result_2=$(sudo gammu -c "/etc/$file" deleteallsms 3)
            sleep 3
        else
            echo "Phone messages deleted successfully"
            continue
        fi
    done

    echo $j
done