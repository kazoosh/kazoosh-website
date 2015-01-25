rm public_html/content/*;
for D in content/*; 
	# for all directories in content folder
	do if [ -d $D ]; 
		then
			for z in $D/*; do
				if [ -f $z ];
					then
						# update if directory contains files
						echo "update public_html/$D.json"
						echo "$z"
						ls $D/* | xargs node node_modules/markdown-to-json/bin/m2j -w 1000000000 -o "public_html/$D.json";
						mkdir "public_html/$D";
						break;
					else
						# remove if directory contains no files
						echo "rm public_html/$D.json"
						rm "public_html/$D.json";
					fi;
				
			done;
 		fi; 
 done;


 #for D in content/*; do if [ -d $D ]; then for z in $D/*; do if [ -f $z ]; then ls $D/* | xargs node node_modules/markdown-to-json/bin/m2j -w 1000000000 -o "public_html/$D.json"; break; else rm "public_html/$D.json"; fi; done; fi; done;