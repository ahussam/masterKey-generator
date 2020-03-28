var os = require('os');


console.log('\x1b[33m', ` ________________________________________
< I am not just a cow I am good at crypto too! >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`);


console.log('\x1b[37m', ` Usage: nodejs masterKeyGenerator.js --keys=4`);

var args = process.argv.slice(2);

var masterKey;


// Check args length 

if (args.length >= 1) {
    
    if (!(args[0].split("=")[0] === "--keys")) {
        console.log('Error:', 'Problem with key value make sure you use flag as --keys={value}');
        process.exit();
    }

    var keys = parseInt(args[0].split("=")[1]);

    // check if keys is number and even  and limit keys to 8 

    if (isNaN(keys) || (keys % 2) !== 0 || keys < 2 || keys > 8 || keys === 6) {

        console.log('Error:', 'Problem with key value make sure key value is 2 or 4 or 8');
        process.exit();

    } else {

        var newArr = [];

        // fill the first array by 8, 4, or 2 random values 

        for (let i = 0; i < keys; i++) {
            var randText = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            newArr.push(randText);
        }

        // Next arrays  

        if (newArr.length === 8) {

            var arr1 = [];
            var arr2 = [];

            // fill the 2nd array with 4 keys 
            for (let i = 0; i < newArr.length; i += 2) {
                arr1.push(XOR_hex(newArr[i], newArr[i + 1]));
            }

            // fill the 3rd array with 2 keys 
            for (let i = 0; i < arr1.length; i += 2) {
                arr2.push(XOR_hex(arr1[i], arr1[i + 1]));
            }

            // Assign masterKey value from the last array 

            masterKey = XOR_hex(arr2[0], arr2[1]);


            // View Keys 

            console.log('\n');
            console.log('     master key is: \n' + '    ' + masterKey)
            console.log('    ---------------------------');
            console.log('     2 sub keys: \n');

            // arr2[0], arr2[0]
            console.log('    ' + arr2[0] + ' ' + arr2[1]);


            console.log('     ---------------------------');
            console.log('     4 sub keys: \n');
            console.log('    ' + arr1[0] + ' ' + arr1[1] + ' ' + arr1[2] + ' ' + arr1[3]);

            console.log('     ---------------------------');
            console.log('     8 sub keys: \n');
            console.log('    ' + newArr[0] + ' ' + newArr[1] + ' ' + newArr[2] + ' ' + newArr[3] + '  \n');
            console.log('    ' + newArr[4] + ' ' + newArr[5] + ' ' + newArr[6] + ' ' + newArr[7]);





        }

        //  console.log(newArr.length);

        if (newArr.length === 4) {

            var arr1 = [];

            // fill the 2nd array with 2 keys 
            for (let i = 0; i < newArr.length; i += 2) {
                arr1.push(XOR_hex(newArr[i], newArr[i + 1]));
            }

            //  Assign masterKey value from the last array 
            masterKey = XOR_hex(arr1[0], arr1[1]);


            // View Keys 

            console.log('\n');
            console.log('     master key is: \n \n' + '     ' + masterKey);

            console.log('    ---------------------------');
            console.log('     2 sub keys: \n');
            console.log('    ' + arr1[0] + ' ' + arr1[1]);

            console.log('     ---------------------------');
            console.log('     4 sub keys: \n');
            console.log('    ' + newArr[0] + ' ' + newArr[1] + ' ' + newArr[2] + ' ' + newArr[3]);


        }


        if (newArr.length === 2) {

            // Assign masterKey value from the last array 

            masterKey = XOR_hex(newArr[0], newArr[1]);

            console.log('\n');
            console.log('     master key is: \n' + '    ' + masterKey);

            console.log('    ---------------------------');
            console.log('     2 sub keys: \n');
            console.log('    ' + newArr[0] + ' ' + newArr[1]);
        }



    }

}
function XOR_hex(a, b) {
    var res = "",
        i = a.length,
        j = b.length;
    while (i-- > 0 && j-- > 0)
        res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16)).toString(16) + res;
    return res;
}
