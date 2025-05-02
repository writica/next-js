import Orbs from "./Orbs.jsx";

export default Orbs;

// Re-export with common preset configurations
export const FullscreenOrbs = (props) => <Orbs fillContainer={true} {...props} />;
export const FixedHeightOrbs = (props) => <Orbs height={400} {...props} />;