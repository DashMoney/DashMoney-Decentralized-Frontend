export default function handleDenomDisplay(duffs, qty = 1) {
  if (duffs >= 1000000) {
    return `${((duffs * qty) / 100000000).toFixed(3)} Dash`;
  } else if (duffs >= 1000) {
    return `${((duffs * qty) / 1000).toFixed(0)} kD`;
  } else if (duffs > 0) {
    return "dust";
  } else if (duffs === 0) {
    return "0.00 Dash";
  } else {
    return "Error";
  }
}

// handleDenomDisplay = (duffs, qty) => {
//   if (duffs >= 1000000) {
//     return (
//       <span style={{ color: "#008de4" }}>
//         {((duffs * qty) / 100000000).toFixed(3)} Dash
//       </span>
//     );
//   } else {
//     return (
//       // <span style={{ color: "#008de4" }}>
//       //   {((duffs * qty) / 100000).toFixed(2)} mDash
//       // </span>
//       <span style={{ color: "#008de4" }}>
//         {((duffs * qty) / 1000).toFixed(0)} kD
//       </span>
//     );
//   }
// };

// handleDenomDisplay = (duffs) => { //DUFFS ONLY, ONLY DIFFERENCE
//   if (duffs >= 1000000) {
//     return (
//       <span style={{ color: "#008de4" }}>
//         {(duffs / 100000000).toFixed(3)} Dash
//       </span>
//     );
//   } else {
//     return (
//       // <span style={{ color: "#008de4" }}>
//       //   {(duffs / 100000).toFixed(2)} mDash
//       // </span>
//       <span style={{ color: "#008de4" }}>
//{(duffs / 1000).toFixed(0)} kD
//</span>
//     );
//   }
// };
