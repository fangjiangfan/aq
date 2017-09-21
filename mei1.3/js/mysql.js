onload = function(){
            var register = document.getElementById("register");
            var aInput=document.getElementsByTagName("input");
            register.onclick = function(){
                var xhr = new XMLHttpRequest();
                xhr.open("post", "http://127.0.0.1/php/mei1.0/php/02_register.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("username="+aInput[0].value + "&password="+aInput[1].value );
                xhr.onreadystatechange = function(){
                    if (xhr.readyState==4 && xhr.status==200) {
                      //  console.log(xhr.responseText);
                    }
                }
            }
        }