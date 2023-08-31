import dynamic from "next/dynamic";
import Spinner from "../Spinner";

const CircularColorsDemo = dynamic(() => import("./CircularColorsDemo"), {
  loading: Spinner,
});

export default CircularColorsDemo;
