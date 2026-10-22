<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../src/output.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Orbitron:wght@400..900&family=Russo+One&display=swap"
        rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>
        .russo {
            font-family: "Russo One", sans-serif;
        }

        .inter {
            font-family: "Inter", sans-serif;
        }
    </style>
    <title>Login</title>
</head>

<body class="inter h-screen w-full flex sm:flex-col  bg-gray-200 justify-between">
    <div class="flex w-full h-full justify-center items-center shadow-2xl ">
        <div class="flex w-[80%] h-[80vh] rounded-2xl bg-white p-0 shadow-2xl">
            <div class="w-1/2 h-full">
                <img src="../images/qwerty.jpg" alt="" class="w-full h-full object-cover rounded-s-2xl">
            </div>
            <div class="w-1/2 h-full    p-20 flex flex-col justify-center items-center py-30">
                <h1 class="text-center text-3xl text-orange-950 font-bold">Sign In</h1>
                <?php
                if (isset($_GET['error'])) {
                    echo '<p class="text-red-500 text-center mt-5">' . $_GET['error'] . '</p>';
                }
                ?>
                <form method="POST" action="../index.php?action=login" class="flex flex-col w-full h-full justify-center items-center">
                    <div class="flex flex-col w-full mx-auto mt-10 space-y-2">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required
                            class="p-2 border-2 border-gray-300 rounded-lg focus:border-[#f36428]"
                            placeholder="Enter Your Email">
                    </div>

                    <div class="flex flex-col w-full mx-auto mt-5 space-y-2">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" required 
                            class="p-2 border-2 border-gray-300 rounded-lg" placeholder="********">   
                    </div>       

                    <div class="w-full mx-auto">
                        <button
                            class="bg-[#f36428] hover:bg-[#d74b0f] text-white font-bold p-4 rounded-lg mt-5 w-full" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>