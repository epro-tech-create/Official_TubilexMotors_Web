<?php

// include './index.php';
$totalVehicles = countVehicles();
$visitorsCount = visitors();
$getComment = getComment();
$commentsCount = countComments();
$visitorsPerDay = countVisitorsToday();
$visitorsPerWeek = countVisitorsThisWeek();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="../src/output.css" rel="stylesheet" />
    <title>Dashboard</title>
    <script src="//unpkg.com/alpinejs" defer></script>
    <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    <link
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Exo:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet" />
    <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css" />
    <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-brands/css/uicons-brands.css" />
    <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-bold-rounded/css/uicons-bold-rounded.css" />
    <style>
        .Exo {
            font-family: "Raleway", sans-serif;
        }
    </style>
</head>

<body
    class="Exo font-medium relative bg-gray-200 h-screen w-full flex p-3"
    x-data="{ 
    open: true, 
    vehicleModal: false,
    commentModal: false
    }">
    <div
        :class="open ? 'w-80' : 'w-20'"
        x-show="open || !open"
        x-transition:enter="transform transition ease-in-out duration-500"
        x-transition:enter-start="-translate-x-full opacity-0"
        x-transition:enter-end="translate-x-0 opacity-100"
        x-transition:leave="transform transition ease-in-out duration-500"
        x-transition:leave-start="translate-x-0 opacity-100"
        x-transition:leave-end="-translate-x-full opacity-0"
        class="h-full transition-all duration-500 ease-in-out">
        <div
            class="w-full h-full bg-white flex flex-col items-center justify-between px-4 py-6 rounded-2xl">
            <div class="w-full h-auto flex flex-col gap-8 pt-2">
                <!-- Logo Section -->
                <div class="flex items-center gap-1">
                    <img src="../favicon.png" alt=" " class="w-10 h-auto ">
                    <h1 x-show="open" x-transition class="text-lg font-extrabold text-gray-800">Tubilex Motors</h1>
                </div>
                <div class="w-full h-auto flex flex-col gap-3">
                    <a
                        href="../index.php?action=dashboard"
                        class="text-gray-800 text-sm hover:text-white transform transition duration-300 ease-in-out bg-gray-100 hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400/20 py-4 px-3 rounded-md flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-auto text-gray-900">
                            <path
                                d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                        </svg>

                        <h1 x-show="open" x-transition>Dashboard</h1>
                    </a>
                    <a
                        href="../index.php?action=viewVehicles"
                        class="text-gray-800 text-sm hover:text-white transform transition duration-300 ease-in-out bg-gray-100 hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400/20 py-4 px-3 rounded-md flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-auto text-gray-900">
                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                            <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>

                        <h1 x-show="open" x-transition>Vehicles</h1>
                    </a>
                    <a
                        @click="commentModal=!commentModal"
                        href="#"
                        class="text-gray-800 text-sm hover:text-white transform transition duration-300 ease-in-out bg-gray-100 hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400/20 py-4 px-3 rounded-md flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-auto text-gray-900">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                        </svg>
                        <h1 x-show="open" x-transition>Comments</h1>
                    </a>
                </div>
            </div>

            <!-- footer form -->
            <form action="../index.php?action=logout" method="post" class="w-full h-auto flex gap-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-auto text-orange-600">
                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
                <button x-show="open" x-transition class="text-md font-medium text-gray-900" type="submit">Logout</button>
            </form>
        </div>
    </div>

    <div class="w-full h-full flex flex-col">
        <div class="w-full h-auto flex justify-between items-center px-4 py-6">
            <div class="w-full h-auto flex gap-2 text-gray-800">
                <a href="#" @click="open = !open">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6 text-gray-900">
                        <path
                            fill-rule="evenodd"
                            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                            clip-rule="evenodd" />
                    </svg>
                </a>
                <h1 class="text-lg font-bold">Dashboard</h1>
            </div>
            <div class="w-full h-auto text-end pr-4">
                <h1 class="text-xl font-bold text-gray-950">Welcome Again Admin</h1>
                <p class="text-gray-500 font-medium">to Tubilex motors</p>
            </div>
        </div>
        <div class="w-full h-auto grid grid-cols-1 grid-rows-2 gap-4">

            <div
                class="w-full h-auto grid grid-cols-[1fr_1fr_1fr_1fr]  px-4 pt-4  gap-4">
                <a
                    href="#"
                    @click="commentModal = !commentModal"
                    class="bg-white shadow-sm hover:shadow-lg transition h-50 rounded-2xl flex flex-col justify-center items-center">
                    <h1 class="text-lg text-gray-800 font-me">Total Comments</h1>
                    <p class="text-5xl font-bold text-gray-800"><?php echo $commentsCount ?></p>
                </a>
                <a
                    href="#"
                    class="bg-white shadow-sm hover:shadow-lg transition h-50 rounded-2xl flex flex-col justify-center items-center">
                    <h1 class="text-lg text-gray-800 font-me">Total Visitors</h1>
                    <p class="text-5xl font-bold text-gray-800"><?php echo $visitorsCount ?></p>
                </a>
                <a
                    href="#"
                    class="bg-white shadow-sm hover:shadow-lg transition h-50 rounded-2xl flex flex-col justify-center items-center">
                    <h1 class="text-lg text-gray-800 font-me">Visitors per Day</h1>
                    <p class="text-5xl font-bold text-gray-800"><?php echo $visitorsPerDay ?></p>
                </a>
                <a
                    href="#"
                    class="bg-white shadow-sm hover:shadow-lg transition h-50 rounded-2xl flex flex-col justify-center items-center">
                    <h1 class="text-lg text-gray-800 font-me">Visitors per Week</h1>
                    <p class="text-5xl font-bold text-gray-800"><?= $visitorsPerWeek ?></p>
                </a>
            </div>
            <div class="w-full h-auto px-4  ">
                <button

                    @click="vehicleModal = !vehicleModal"
                    class="bg-white w-full shadow-sm hover:shadow-lg transition h-50 rounded-2xl flex justify-between items-end pl-10 px-5 py-5 cursor-pointer">
                    <div class="w-auto h-full flex flex-col justify-center items-start">
                        <h1 class="text-lg text-gray-800 font-me">Add Vehicles</h1>
                        <p class="text-5xl font-bold text-orange-600"><?php echo $totalVehicles ?></p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-12 text-orange-600">
                        <path
                            fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            clip-rule="evenodd" />
                    </svg>

                </button>
            </div>
        </div>
    </div>

    <!-- Add new vehicle modal -->
    <div class="absolute top-0 left-0 h-full w-full"
        x-show="vehicleModal"
        style="display: none;"
        x-transition>
        <div
            class="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
        <div
            @click.away="vehicleModal = !vehicleModal"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[50vw] flex flex-col items-center justify-center px-8 py-15 bg-gray-50 gap-6 rounded-md">
            <h1 class="text-3xl font-bold text-gray-800">Add new Vehicle</h1>
            <form
                action="../index.php?action=createVehicle"
                method="post"
                enctype="multipart/form-data"
                class="flex flex-col gap-2 w-full h-full">
                <label for="name">Name of Car</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Car Type"
                    class="p-2 border-gray-300 border-2 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 focus:border-blue-500 resize-none text-gray-800"
                    required />
                <label for="category">Category</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="SUV"
                    class="p-2 border-gray-300 border-2 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 focus:border-blue-500 resize-none text-gray-800"
                    required />
                <label for="name">Descriprion of the Car</label>
                <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Write something about the car..."
                    class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 focus:border-blue-500 resize-none text-gray-800 placeholder-gray-400"

                    required>
                </textarea>
                <label for="image">Choose Image</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    class="p-2 border-gray-300 border-2 rounded-md cursor-pointer"
                    required />
                <button
                    type="submit"
                    class="px-4 py-2 bg-orange-600 text-white font-medium text-md rounded-md">
                    Submit
                </button>
            </form>
        </div>
    </div>

    <!-- comment -->
    <div class="absolute top-0 left-0 h-full w-full"
        x-show="commentModal"
        style="display: none;"
        x-transition>
        <div
            class="absolute bg-black/70 top-0 left-0 h-full w-full"></div>
        <div
            @click.away="commentModal=!commentModal"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md h-[90vh] w-[90vw] px-15 py-8 flex flex-col space-y-4 ">
            <h1 class="text-3xl font-extrabold text-center w-full h-auto text-orange-600">Comments</h1>
            <div class="overflow-y-scroll w-full h-auto flex flex-col space-y-6">

                <?php if (!empty($getComment)): ?>
                    <?php foreach ($getComment as $comment): ?>
                        <div class="bg-gray-200 rounded-lg w-full h-auto p-4 text-gray-950 flex flex-col gap-4 ">
                            <div class="flex flex-col ">
                                <h1 class="text-xl font-bold"><?php echo htmlspecialchars($comment['name']); ?></h1>
                                <p class="text-gray-800"><?php echo htmlspecialchars($comment['email']); ?></p>
                            </div>
                            <p><?php echo htmlspecialchars($comment['message']); ?></p>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <h1 class="text-md font-medium text-red-600">No vehicles found</h1>
                <?php endif; ?>
            </div>

            <button @click="commentModal = false" class="px-4 py-2 bg-orange-600 text-white font-medium text-md rounded-md w-20 h-auto cursor-pointer">
                cancel
            </button>
        </div>
    </div>
</body>

</html>