import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";

const themeColors = [
  { name: "Blue", color: "#1A97F5" },
  { name: "Green", color: "#03C9D7" },
  { name: "Purple", color: "#7352FF" },
  { name: "Red", color: "#FF5C8E" },
];

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className="bg-half-transparent w-screen fixed top-0 right-0 z-[2000]">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-80">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* MODE */}
        <div className="flex-col border-t border-color p-4 ml-4">
          <p className="font-semibold text-xl">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2">Light</label>
          </div>

          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2">Dark</label>
          </div>
        </div>

        {/* COLORS */}
        <div className="p-4 border-t border-color ml-4">
          <p className="font-semibold text-xl">Theme Colors</p>

          <div className="flex gap-3 mt-2">
            {themeColors.map((item, index) => (
              <button
                key={index}
                title={item.name}
                type="button"
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.color }}
                onClick={() => setColor(item.color)}
              >
                <BsCheck
                  className={`text-2xl text-white ${
                    item.color === currentColor ? "block" : "hidden"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThemeSettings;
