#create navi.json file with folder names as contents
json="";
json+="{";
json+="\"contents\": [";
seperator="";
for D in content/*; 
	# for all directories in content folder
	do if [ -d $D ]; 
		then
			#exlude folders starting with
			if [ ${D:8:1} != "_" ];
				then
					#strip of string "content/"
					json+=$seperator"\""${D:8}"\"";
					seperator=",";
				else
					echo "exclude "${D:8}
				fi;
 		fi; 
 done;

json+="]";
json+="}";

rm public_html/content/navi.json
echo $json >> public_html/content/navi.json