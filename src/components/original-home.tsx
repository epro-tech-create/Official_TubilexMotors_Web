"use client";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
// The original PHP homepage markup and CSS are preserved; React replaces Alpine/PHP behavior.
export function OriginalHome({ vehicles }: { vehicles: Vehicle[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  async function submitEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setSending(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          phone: "",
          message: values.get("message"),
          vehicleId: null,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not send your message.");
      alert("✅ Message sent successfully.");
      form.reset();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <main id="main" className="inter w-full h-full">
      {"\n    \n\n    \n    "}
      <header className="w-full">
        {"\n        \n        "}
        <div className="w-full bg-gray-950 flex items-center justify-between px-4 sm:px-10 flex-col  text-sm sm:flex-row gap-2  py-4">
          {"\n            "}
          <div className="flex items-center gap-2 text-gray-300">
            {"\n                \n                "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clipRule="evenodd"
              ></path>
              {"\n                "}
            </svg>
            {"\n                "}
            <p>{"MON - SAT | 8:00AM - 6:00PM"}</p>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="flex items-center gap-2 text-gray-300">
            {"\n                \n                "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              ></path>
              {"\n                "}
            </svg>
            {"\n                "}
            <p>{"Mbezi Luis, Dar es salaam, Tz"}</p>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="flex items-center gap-2 text-gray-300">
            {"\n                \n                "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="M19.5 9.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L16.06 9h2.69a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
              ></path>
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              ></path>
              {"\n                "}
            </svg>
            {"\n                "}
            <a
              href="https://wa.me/255788835182?text=Hello%20I%20am%20interested%20in%20your%20cars.%20Can%20you%20share%20details%3F"
              target="_blank"
              rel="noopener"
            >
              {"+255 788 835 182"}
            </a>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n        \n        "}
        <div className="w-full bg-[#f36428] flex justify-between items-center px-6 sm:px-15 py-4">
          {"\n            "}
          <div className="hidden sm:block"></div>
          {"\n            "}
          <div className="text-white font-bold text-2xl sm:text-3xl">
            {"TUBILEX MOTORS"}
          </div>
          {"\n            "}
          <a
            href="#orders"
            className="cursor-pointer bg-white text-gray-900 py-1 px-4 rounded-full text-sm sm:text-md font-medium transition duration-300 hover:bg-gray-200"
          >
            {"\n                Explore Now\n            "}
          </a>
          {"\n        "}
        </div>
        {"\n\n        \n        "}
        <nav className="w-full bg-white flex justify-between items-center px-4 sm:px-10 py-3">
          {"\n            \n            "}
          <div className="h-full w-full flex justify-center items-center py-2 px-2">
            {"\n\n                "}
            <ul className="hidden sm:flex items-center justify-center gap-6 md:gap-10">
              {"\n                    "}
              <li>
                <a href="#" className="text-gray-900 hover:text-[#f36428]">
                  {"Home"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href="#about" className="text-gray-900 hover:text-[#f36428]">
                  {"About Us"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href="#services"
                  className="text-gray-900 hover:text-[#f36428]"
                >
                  {"Services"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href="#orders"
                  className="text-gray-900 hover:text-[#f36428]"
                >
                  {"Cars"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a href="#faq" className="text-gray-900 hover:text-[#f36428]">
                  {"FAQs"}
                </a>
              </li>
              {"\n                    "}
              <li>
                <a
                  href="#contacts"
                  className="text-gray-900 hover:text-[#f36428]"
                >
                  {"Contact Us"}
                </a>
              </li>
              {"\n                "}
            </ul>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="flex sm:hidden justify-center items-center">
            {"\n                "}
            <button
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="pr-2"
            >
              {"\n                    \n                    "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-900"
              >
                {"\n                        "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                ></path>
                {"\n                    "}
              </svg>
              {"\n                "}
            </button>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div
            style={{ display: menuOpen ? undefined : "none" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
            className="fixed sm:hidden inset-0 bg-black/70 flex justify-end z-50"
          >
            {"\n                "}
            <div className="w-[80%] sm:w-[60%] bg-white h-full flex flex-col py-6 px-6 space-y-4">
              {"\n                    "}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="self-end mb-6"
              >
                {"\n                        \n                        "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-gray-900"
                >
                  {"\n                            "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                    "}
              </button>
              {"\n                    "}
              <a
                href="#"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"Home"}
              </a>
              {"\n                    "}
              <a
                href="#about"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"About Us"}
              </a>
              {"\n                    "}
              <a
                href="#services"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"Services"}
              </a>
              {"\n                    "}
              <a
                href="#orders"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"Cars"}
              </a>
              {"\n                    "}
              <a
                href="#faq"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"FAQs"}
              </a>
              {"\n                    "}
              <a
                href="#contacts"
                className="block py-2 border-b border-gray-100 hover:text-[#f36428]"
              >
                {"Contact Us"}
              </a>
              {"\n                    "}
              <a
                href="https://wa.me/255788835182?text=Hello%20I%20am%20interested%20in%20your%20cars.%20Can%20you%20share%20details%3F"
                target="_blank"
                rel="noopener"
                className="mt-6 text-white bg-gradient-to-tr from-[#f45516] to-[#ff6324] rounded-full font-semibold px-4 py-2 text-center"
              >
                {"\n                        Order Now\n                    "}
              </a>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n        "}
        </nav>
        {"\n    "}
      </header>
      {"\n    "}
      <div className="relative w-full h-150 bg-white   ">
        {"\n        "}
        <div className="absolute top-0 left-0 h-full w-full px-2 sm:px-8 ">
          {"\n\n            \n            "}
          <img
            src="images/jeep-wrangler-sunset-adventure.jpg"
            alt=""
            className="w-full h-full object-cover rounded-3xl opacity-80 z-0"
          />
          {"\n            \n            "}
          <div className="relative w-full px-10 sm:px-10 md:px-20 lg:px-40 -mt-50 lg:-mt-40  z-10">
            {"\n                "}
            <div className="px-4 sm:px-10 shadow-lg hover:shadow-2xl hover:scale-102 duration-200 ease-in bg-white w-full rounded-sm flex flex-col md:flex-row items-center justify-between py-5 sm:py-6 gap-4">
              {"\n                    "}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-950/80 md:w-1/2 text-center md:text-left">
                {
                  "\n                        Want to drive your dream car today?\n                    "
                }
              </h1>
              {"\n                    "}
              <div className="flex gap-2 flex-row items-center">
                {"\n                        "}
                <a
                  href="https://wa.me/255788835182?text=Hello%20I%20am%20interested%20in%20your%20cars.%20Can%20you%20share%20details%3F"
                  target="_blank"
                  rel="noopener"
                  className="cursor-pointer px-4 py-1 bg-[#f36428] text-md font-medium text-center text-white"
                >
                  {
                    "Book\n                            a\n                            Car"
                  }
                </a>
                {"\n                        "}
                <a
                  href="#contacts"
                  className="cursor-pointer px-4 py-1 bg-[#f36428] text-md font-medium text-center text-white"
                >
                  {"Contact\n                            Us"}
                </a>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n\n    "}
      <div className="bg-white text-4xl sm:text-5xl lgtext-6xl  italic font-extrabold text-[#f36428]/60 flex justify-center items-center h-40 text-center">
        {"\n        Cars\n        Without Borders..."}
      </div>
      {"\n\n    "}
      <section
        id="orders"
        className="w-full h-auto bg-gray-950 flex flex-col place-content-center place-items-center gap-6 py-18"
      >
        {"\n        "}
        <h1 className="text-3xl font-bold text-white">
          {"Explore All vehicles"}
        </h1>
        {"\n        "}
        <div className="w-10 h-0.5 bg-[#f36428]"></div>
        {"\n\n        "}
        <div className="h-auto w-full flex justify-center items-center gap-5 flex-wrap ">
          {"\n\n            \n            "}
          {vehicles.length ? (
            vehicles.map((vehicle) => (
              <div
                className="h-100 w-80 bg-white p-2 gap-2 transform hover:scale-102 duration-400 ease-in-out shadow-2xl"
                key={vehicle.id}
              >
                {"\n                        "}
                <div className="h-[60%] w-full overflow-hidden">
                  {"\n                            "}
                  <img
                    src={vehicle.image}
                    alt={vehicle.image}
                    className="w-full h-full object-cover transform hover:scale-105 duration-400 ease-in-out "
                  />
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div className="h-[40%] w-full flex flex-col justify-between p-2">
                  {"\n                            "}
                  <div className="flex flex-col">
                    {"\n\n                                "}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {vehicle.name}
                    </h2>
                    {"\n                                "}
                    <p className="text-sm text-gray-600">{vehicle.category}</p>
                    {"\n                                "}
                    <p className="text-sm text-gray-600">
                      {vehicle.description}
                    </p>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <a
                    href="https://wa.me/255788835182?text=Hello%20I%20am%20interested%20in%20your%20cars.%20Can%20you%20share%20details%3F"
                    target="_blank"
                    rel="noopener"
                    className="cursor-pointer mt-2 px-3 py-1 bg-[#f36428] text-white text-center text-sm rounded hover:bg-[#d9531e]"
                  >
                    {
                      "\n                                order now\n                            "
                    }
                  </a>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-bold text-red-600">
              No vehicles found
            </h1>
          )}
          {"\n        "}
        </div>
        {"\n    "}
      </section>
      {"\n\n    "}
      <img
        src="images/2.jpg"
        alt=""
        className="fixed top-0 left-0 right-0 w-full h-full object-cover -z-10"
      />
      {"\n\n    \n    "}
      <div
        id="about"
        className="relative w-full h-auto flex flex-col justify-center items-center gap-6 text-center px-10 md:px-50 py-20 sm:py-30"
      >
        {"\n        "}
        <div className="absolute top-0 left-0 right-0 w-full h-full bg-white/90 -z-5"></div>
        {"\n\n        "}
        <div className="flex justify-center items-center w-full gap-4">
          {"\n            "}
          <div className="w-[40px]  h-[2px] md:h-[4px] bg-gray-900"></div>
          {"\n            "}
          <h1 className="text-3xl md:text-4xl font-bold text-[#f36428] ">
            {"\n                About Us\n            "}
          </h1>
          {"\n            "}
          <div className="w-[40px]  h-[2px] md:h-[4px] bg-gray-900"></div>
          {"\n        "}
        </div>
        {"\n        "}
        <p className="text-sm sm:text-md md:text-lg text-gray-800 font-medium">
          {
            "\n            TUBILEX MOTORS COMPANY LIMITED is a quality company specializing in the import and\n            export of high-quality cars and auto spare parts. Located at Old Morogoro Road – Mbezi\n            Luis, Ubungo, Dar es-Salaam in Tanzania. We are dedicated to providing superior\n            automotive solutions to meet the dynamic needs of our clients worldwide. Our commitment\n            to excellence and customer satisfaction has earned us a reputation as a trusted partner in\n            the global automotive market.\n        "
          }
        </p>
        {"\n    "}
      </div>
      {"\n    "}
      <div className="w-full h-80"></div>
      {"\n\n    "}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 py-15 md:py-24 lg:py-30 bg-[#f36428] px-10 md:px-20 lg:px-40">
        {"\n        \n        "}
        <div className="scroll flex flex-col justify-center bg-gray-950  border-l-4 border-white p-6 rounded-2xl z-40 items-center gap-5 shadow-2xl">
          {"\n            "}
          <div className="flex flex-col gap-4 justify-center items-center">
            {"\n                "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-14 text-[#f36428]"
            >
              {"\n                    "}
              <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z"></path>
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                clipRule="evenodd"
              ></path>
              {"\n                "}
            </svg>
            {"\n\n                "}
            <h1 className="text-3xl md:text-4xl font-bold text-white z-40">
              {"Vision"}
            </h1>
            {"\n            "}
          </div>
          {"\n            "}
          <p className="text-sm sm:text-md md:text-lg font-normal text-white/70 z-40 text-center pb-4">
            {
              "To be a trust leader\n                in the automotive\n                industry, recognized for innovation, reliability, and\n                exceptional customer service."
            }
          </p>
          {"\n        "}
        </div>
        {"\n        \n        "}
        <div className="scroll flex flex-col justify-center bg-gray-950  border-l-4 border-white  p-8 rounded-2xl z-40 items-center gap-5 shadow-2xl ">
          {"\n            "}
          <div className="flex flex-col gap-4 justify-center items-center">
            {"\n                "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-14 text-[#f36428]"
            >
              {"\n                    "}
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                clipRule="evenodd"
              ></path>
              {"\n                    "}
              <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"></path>
              {"\n                "}
            </svg>
            {"\n                "}
            <h1 className="text-3xl md:text-4xl font-bold text-white z-40">
              {"Mission"}
            </h1>
            {"\n            "}
          </div>
          {"\n            "}
          <p className="text-sm sm:text-md md:text-lg font-normal text-white/70 z-40 text-center pb-4">
            {
              "We are committed to\n                provide clients with\n                exceptional automotive products and services that\n                exceed expectations."
            }
          </p>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n\n    \n    "}
      <div
        id="services"
        className="relative w-full h-auto py-20 flex flex-col justify-center items-center gap-6 md:gap-10 px-4 md:px-6 lg:px-8 bg-white"
      >
        {"\n        \n        "}
        <div className="flex justify-center items-center w-full gap-4">
          {"\n            "}
          <div className="w-[40px] h-[2px] md:h-[4px] bg-[#f36428]"></div>
          {"\n            "}
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {"\n                Our Services\n            "}
          </h1>
          {"\n            "}
          <div className="w-[40px]  h-[2px] md:h-[4px] bg-[#f36428]"></div>
          {"\n        "}
        </div>
        {"\n        \n        "}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 lg:gap-7 sm:px-4 lg:px-6">
          {"\n            "}
          <a href="#">
            {"\n                "}
            <div className="relative  w-80 lg:w-90  h-90 flex flex-col bg-white shadow-xl shadow-[#f36428]/20 hover:shadow-2xl rounded-xl transition-all duration-300 hover:scale-105">
              {"\n                    \n                    "}
              <div className="relative w-full h-[50%] rounded-t-lg overflow-hidden">
                {"\n                        "}
                <img
                  src="images/cargo-delivery-vehicle.jpg"
                  alt="Image of a person"
                  className="rounded-t-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-120"
                />
                {"\n                    "}
              </div>
              {"\n\n                    \n                    "}
              <div className="w-full h-[50%] px-6 pt-6 flex flex-col">
                {"\n                        "}
                <h1 className="text-2xl md:text-[26px] font-bold text-[#f36428]">
                  {
                    "\n                            Car Import & Export\n                        "
                  }
                </h1>
                {"\n                        "}
                <p className="text-sm md:text-md font-medium text-gray-900/70 pt-1">
                  {
                    "\n                            We import used cars and top-brand vehicles from reliable global\n                            manufacturers.\n                        "
                  }
                </p>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </a>
          {"\n            "}
          <a href="#">
            {"\n                "}
            <div className="relative w-80 lg:w-90  h-90 flex flex-col bg-white shadow-xl shadow-[#f36428]/20 hover:shadow-2xl rounded-xl transition-all duration-300 hover:scale-105">
              {"\n                    \n                    "}
              <div className="relative w-full h-[50%] rounded-t-lg overflow-hidden">
                {"\n                        "}
                <img
                  src="images/different-car-accessories-composition.jpg"
                  alt="Image of a person"
                  className="rounded-t-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-120"
                />
                {"\n                    "}
              </div>
              {"\n\n                    \n                    "}
              <div className="w-full h-[50%] px-6 pt-6 flex flex-col">
                {"\n                        "}
                <h1 className="text-2xl md:text-[26px] font-bold text-[#f36428]">
                  {
                    "\n                            Auto Spare Parts\n                        "
                  }
                </h1>
                {"\n                        "}
                <p className="text-sm md:text-md font-medium text-gray-900/70 pt-1">
                  {
                    "\n                            Genuine, high-quality auto spare parts for a variety of vehicle\n                            makes and models. Comprehensive inventory to meet diverse client\n                            needs.\n                        "
                  }
                </p>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </a>
          {"\n            "}
          <a href="#">
            {"\n                "}
            <div className="relative w-80 lg:w-90  h-90 flex flex-col bg-white shadow-xl shadow-[#f36428]/20 hover:shadow-2xl rounded-xl transition-all duration-300 hover:scale-105">
              {"\n                    \n                    "}
              <div className="relative w-full h-[50%] rounded-t-lg overflow-hidden">
                {"\n                        "}
                <img
                  src="images/employee-listens-client-car-request.jpg"
                  alt="Image of a person"
                  className="rounded-t-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-120"
                />
                {"\n                    "}
              </div>
              {"\n\n                    \n                    "}
              <div className="w-full h-[50%] px-6 pt-6 flex flex-col">
                {"\n                        "}
                <h1 className="text-2xl md:text-[26px] font-bold text-[#f36428]">
                  {
                    "\n                            Consultations\n                        "
                  }
                </h1>
                {"\n                        "}
                <p className="text-sm md:text-md font-medium text-gray-900/70 pt-1">
                  {
                    "\n                            Expert advice on vehicle and spare part selection tailored to\n                            individual or business requirements.\n                        "
                  }
                </p>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </a>
          {"\n\n\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n    \n    "}
      <div className="w-full h-auto  px-10 md:px-25 py-15 pb-25 bg-white/90 ">
        {"\n\n        "}
        <div className="flex justify-center items-center w-full gap-4 pb-14">
          {"\n            "}
          <div className="w-[40px] h-[2px] md:h-[4px] bg-[#f36428]"></div>
          {"\n            "}
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {"\n                Core Values\n            "}
          </h1>
          {"\n            "}
          <div className="w-[40px] h-[2px] md:h-[4px] bg-[#f36428]"></div>
          {"\n        "}
        </div>
        {"\n        "}
        <div className="w-full h-auto flex flex-col md:grid md:grid-cols-2 gap-6">
          {"\n            "}
          <div className="place-self-end space-y-4 bg-[#f36428] shadow-xl shadow-[#f36428]/20   rounded-lg flex flex-col rounded-br-[80px] w-full md:max-w-150 min-h-40 max-h-auto pb-10">
            {"\n                "}
            <div className="px-7 md:px-10 pt-6 md:pt-8 gap-2 flex flex-col">
              {"\n                    "}
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {"\n                        Integrity\n                    "}
              </h1>
              {"\n                    "}
              <p className="text-md md:text-lg font-medium text-white/80">
                {
                  "\n                        Building trust through transparency and ethical business practices.\n                    "
                }
              </p>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="place-self-start space-y-4 bg-gray-900 shadow-xl shadow-[#f36428]/20 rounded-lg flex flex-col rounded-bl-[80px] w-full md:max-w-150 min-h-40 max-h-auto pb-10">
            {"\n                "}
            <div className="px-7 md:px-10 pt-6 md:pt-8 gap-2 flex flex-col text-end">
              {"\n                    "}
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {"\n                        Excellence\n                    "}
              </h1>
              {"\n                    "}
              <p className="text-md md:text-lg font-medium text-white/60">
                {
                  "\n                        Striving for the highest standards in all aspects of our business.\n                    "
                }
              </p>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="place-self-end space-y-4 bg-gray-900 shadow-xl shadow-[#f36428]/20 rounded-lg flex flex-col rounded-tr-[80px] w-full md:max-w-150 min-h-40 max-h-auto pb-10">
            {"\n                "}
            <div className="px-7 md:px-10 pt-6 md:pt-8 gap-2 flex flex-col text-start">
              {"\n                    "}
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {
                  "\n                        Customer-Centricity\n                    "
                }
              </h1>
              {"\n                    "}
              <p className="text-md md:text-lg font-medium text-white/60">
                {
                  "\n                        Putting our clients at the center of our operations.\n                    "
                }
              </p>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="place-self-start space-y-4 bg-[#f36428] shadow-xl shadow-[#f36428]/20 rounded-lg flex flex-col rounded-tl-[80px] w-full md:max-w-150 min-h-40 max-h-auto pb-10">
            {"\n                "}
            <div className="px-7 md:px-10 pt-6 md:pt-8 flex gap-2 flex-col text-end">
              {"\n                    "}
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {
                  "\n                        Sustainability\n                    "
                }
              </h1>
              {"\n                    "}
              <p className="text-md md:text-lg font-medium text-white/80">
                {
                  "\n                        Committing to environmentally friendly practices in our processes.\n                    "
                }
              </p>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n    \n    \n    "}
      <div
        id="faq"
        className="flex flex-col gap-4 justify-center items-center pt-30 pb-40 w-full  h-auto bg-gray-950"
      >
        {"\n        \n        "}
        <h1 className="text-4xl font-extrabold text-white">{"FAQs"}</h1>
        {"\n        "}
        <div className="h-1 w-14 bg-[#ff6324] mb-6"></div>
        {"\n\n        "}
        <div className="overflow-hidden grid grid-cols-1 gap-4 h-full w-full  px-4 sm:px-8 lg:px-18 ">
          {"\n            \n            "}
          <div className="w-full h-auto  py-4  px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 1 ? null : 1))}
              aria-expanded={openFaq === 1}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-md md:text-lg font-medium text-white ">
                {
                  "What types of vehicles does\n                        TUBILEX MOTORS offer?"
                }
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 1 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 1 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 1 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md "
            >
              {
                "\n                    We specialize in the import and export of high-quality vehicles, including sedans, SUVs, pickups,\n                    and luxury cars. Our collection is carefully selected to meet the needs of both individual clients\n                    and corporate customers.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="w-full h-auto  py-3 px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 2 ? null : 2))}
              aria-expanded={openFaq === 2}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-lg font-medium text-white">
                {"Are the vehicles brand new or used?"}
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 2 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324]"
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 2 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324]"
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 2 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md"
            >
              {
                "\n                    TUBILEX MOTORS provides both brand-new and certified pre-owned vehicles. Every car is thoroughly\n                    inspected to ensure it meets international safety and quality standards before delivery.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="w-full h-auto  py-3 px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 3 ? null : 3))}
              aria-expanded={openFaq === 3}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-lg font-medium text-white">
                {"Can I finance or pay in installments?\n                    "}
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 3 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 3 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 3 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md"
            >
              {
                "\n                    Yes. We offer flexible payment plans and financing options through our trusted banking and\n                    micro-finance partners. Our team will guide you in selecting the best plan that suits your budget.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="w-full h-auto  py-3 px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 4 ? null : 4))}
              aria-expanded={openFaq === 4}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-lg font-medium text-white">
                {
                  "Do you provide warranty and after-sales\n                        support?"
                }
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 4 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 4 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text--[#ff6324]"
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 4 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md"
            >
              {
                "\n                    Absolutely. All our vehicles come with a warranty package that covers key components. We also\n                    provide after-sales support, including maintenance advice and assistance with spare parts.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="w-full h-auto  py-3 px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 5 ? null : 5))}
              aria-expanded={openFaq === 5}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-lg font-medium text-white">
                {
                  "How long does it take to receive a car\n                        once ordered?"
                }
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 5 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 5 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 5 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md"
            >
              {
                "\n                    Delivery time depends on the type of vehicle and your location. For in-stock vehicles, delivery can\n                    take as little as 3–7 business days. For special imports, the process may take 4–6 weeks.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n\n            \n            "}
          <div className="w-full h-auto py-3 px-7 border-b-2 border-gray-200/40">
            {"\n                "}
            <button
              onClick={() => setOpenFaq((value) => (value === 6 ? null : 6))}
              aria-expanded={openFaq === 6}
              className="flex justify-between items-center w-full text-left gap-3"
            >
              {"\n                    "}
              <h1 className="text-md md:text-lg font-medium text-white">
                {
                  "Does TUBILEX MOTORS help with vehicle\n                        registration and insurance?"
                }
              </h1>
              {"\n                    "}
              <span>
                {"\n                        "}
                <svg
                  style={{ display: openFaq !== 6 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text-[#ff6324] "
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n                        "}
                <svg
                  style={{ display: openFaq === 6 ? undefined : "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 lg:size-7 cursor-pointer text--[#ff6324]"
                >
                  {"\n                            "}
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  ></path>
                  {"\n                        "}
                </svg>
                {"\n\n                    "}
              </span>
              {"\n                "}
            </button>
            {"\n                "}
            <div
              style={{ display: openFaq === 6 ? undefined : "none" }}
              className="mt-8 text-white text-sm sm:text-md"
            >
              {
                "\n                    Yes. We offer full assistance with registration, licensing, and insurance to ensure that your car is\n                    ready for the road the moment you receive it.\n                "
              }
            </div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n\n    "}
      </div>
      {"\n    \n    "}
      <div
        id="contacts"
        className="h-auto w-full px-4 sm:px-8 md:px-12 py-4 sm:py-8 md:py-12 pb-15 flex items-center justify-center  bg-[#ff6324]"
      >
        {"\n        "}
        <div className=" grid grid-cols-1 grid-rows-[1fr_1.5fr] md:grid-cols-[1fr_1.5fr] md:grid-rows-1 w-full h-full bg-gray-100  p-4  ">
          {"\n            "}
          <div className="relative w-full h-full block ">
            {"\n                "}
            <video
              src="video/2.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover "
            ></video>
            {"\n                \n            "}
          </div>
          {"\n            "}
          <form
            className="grid grid-rows-[0.5fr_1fr_1fr_2fr_1fr]    gap-4 px-6 sm:px-12 py-2 sm:py-8 "
            onSubmit={submitEnquiry}
          >
            {"\n                "}
            <h1 className="text-3xl font-extrabold text-[#ff6324] flex items-center">
              {"Contact Us\n                "}
            </h1>
            {"\n                "}
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="w-full h-full p-4 bg-white focus:outline-2 outline-[#ff6324]/70 outline-offset-4"
            />
            {"\n                "}
            <input
              type="text"
              placeholder="Your Email"
              name="email"
              className="w-full h-full p-4 bg-white focus:outline-2 outline-[#ff6324]/70 outline-offset-4"
            />
            {"\n                "}
            <textarea
              placeholder="comment"
              name="message"
              cols={20}
              rows={3}
              className="w-full h-full p-4 bg-white focus:outline-2 outline-[#ff6324]/70 outline-offset-4"
              id=""
            ></textarea>
            {"\n                "}
            <button
              type="submit"
              className="cursor-pointer w-full h-full p-4 bg-gray-800 text-white font-semibold hover:bg-gray-900 ease-in-out duration-300"
              disabled={sending}
            >
              {"Send"}
            </button>
            {"\n            "}
          </form>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n    \n    "}
      <footer className="relative w-full h-auto bg-black flex flex-col gap-4  border-2">
        {"\n        \n\n        "}
        <div className=" mt-10 flex items-center justify-center">
          {"\n            "}
          <div className="h-0.5 w-[80vh] bg-white/40"></div>
          {"\n        "}
        </div>
        {"\n\n        "}
        <div className=" grid gap-6 grid-cols-1 grid-rows-[1fr_3fr]  p-0 md:p-18 md:grid-cols-[1fr_2fr] md:grid-rows-1 px-6 sm:px-12 py-8 sm:py-14 md:py-20">
          {"\n            "}
          <div className="text-white flex gap-2 justify-center items-center flex-col  ">
            {"\n                "}
            <h1 className="text-2xl md:text-4xl font-extrabold ">
              {"Tubilex Motors"}
            </h1>
            {"\n                "}
            <p className="text-sm md:text-md font-normal text-white/50">
              {"Cars Without Borders"}
            </p>
            {"\n            "}
          </div>
          {"\n            "}
          <div className="grid grid-cols-[1fr_1fr] h-full w-auto gap-2 md:gap-8">
            {"\n                "}
            <div className="text-white flex flex-col  gap-2">
              {"\n                    "}
              <h1 className="text-xl md:text-2xl font-semibold">
                {"Quick Links"}
              </h1>
              {"\n                    "}
              <div className="h-1 w-8 bg-[#ff6324] mb-2"></div>
              {"\n                    "}
              <a
                href="#"
                className="text-sm sm:text-lg text-gray-300 hover:text-white"
              >
                {"Home"}
              </a>
              {"\n                    "}
              <a
                href="#about"
                id="about-link"
                className="text-sm sm:text-lg text-gray-300 hover:text-white"
              >
                {"About"}
              </a>
              {"\n                    "}
              <a
                href="#services"
                id="services-link"
                className="text-sm sm:text-lg text-gray-300 hover:text-white"
              >
                {"Services"}
              </a>
              {"\n                    "}
              <a
                href="#faq"
                id="faqs-link"
                className="text-sm sm:text-lg text-gray-300 hover:text-white"
              >
                {"Cars"}
              </a>
              {"\n                    "}
              <a
                href="#contacts"
                id="contacts-link"
                className="text-sm sm:text-lg text-gray-300 hover:text-white"
              >
                {"Contact\n                        Us"}
              </a>
              {"\n                "}
            </div>
            {"\n                "}
            <div className="text-white flex flex-col  gap-2">
              {"\n                    "}
              <h1 className="text-xl md:text-2xl font-semibold">
                {"Location"}
              </h1>
              {"\n                    "}
              <div className="h-1 w-8 bg-[#ff6324] mb-2"></div>
              {"\n\n                    "}
              <div className="text-gray-300 text-sm sm:text-lg md:text-lg/7">
                {
                  "\n                        Old Morogoro Road – Mbezi Luis, Ubungo, Dar es-Salaam "
                }
                <br />
                {
                  "\n                        P.BOX 30382 Kibaha, Pwani, Tanzania "
                }
                <br />
                {"\n                        Phone: +255 788 835 182, "}
                <br />
                {
                  "\n                        Email: tubilexmotorslimited@gmail.com, "
                }
                <br />
                {
                  "\n                        Website: www.tubilex.co.tz\n                    "
                }
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n\n    "}
      </footer>
      {"\n    "}
      <p className="h-auto w-full text-white text-center bg-gradient-to-tr from-[#bb3804] to-[#ff6324] p-5 text-sm sm:text-md md:text-xl font-semibold">
        {"\n        2025\n        Tubilex Motors. All rights reserved. "}
      </p>
      {"\n    \n    \n"}
    </main>
  );
}
