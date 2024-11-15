export const colors = { 
  // Light Mode Colors
  light: {
    white: "#F0F3F5",
    white40: "rgba(240,243,245,0.4)",
    white60: "rgba(240,243,245,0.6)",
    white80: "rgba(240,243,245,0.8)",
    blue: "#1E7FA5",
    blue80: "rgba(30,127,165,0.8)",
    deepBlue: "#08415C",
    deepBlue40: "rgba(8, 65, 92, 0.4)",
    deepBlue60: "rgba(8, 65, 92, 0.6)",
    deepBlue80: "rgba(8, 65, 92, 0.8)",
    lightStroke : "rgba(46, 139, 183, 0.2)",
    lightStrokeBleu : "rgba(136, 181, 223, 0.15)",
    red: "#C23233",
    red80: "rgba(194, 50, 51, 0.8)",
    bgBlue: "#9FC3E5",
    bgBlue40: "rgba(159,195,229,0.4)",
    black20: "rgba(18,18,18,0.2)"
  },

  // Dark Mode Colors
  dark: {
    deepWhite: "#F0F3F5",
    deepWhite20: "rgba(240, 243, 245, 0.2)",
    deepWhite40: "rgba(240, 243, 245, 0.4)",
    deepWhite60: "rgba(240, 243, 245, 0.6)",
    deepWhite80: "rgba(240, 243, 245, 0.8)",
    darkGrey80: "rgba(26, 26, 26, 0.8)",
    stroke: "rgba (255, 255, 255, 0.2)",
    black: "#121212",
    red:"#F93132"
  },

  // Other Colors
  other: {
    black: "#000000",
    lightBlue: "#8EAACD",
    midBlue: "#5C8CC8",
    lightGreen: "#ECFEE8",
    lightestBlue: "#E4EEFB",
    mediumBlue: "#346EA2",
    tan: "#FEF5EC"
  },

  // Greyscale
  grey: {
    lightGrey: "#D9D9D9",
    mediumDarkGrey: "#B3B3B3",
    darkGrey: "#6C6C6C",
    deepGrey: "#484848"
  }
};

export const typography = (fontsLoaded) => ({
  display: {
    fontSize: 136,
    fontFamily: fontsLoaded ? "DMSans_700Bold" : "System", // Assuming bold display
    color: colors.dark.black,
  },
  displaySubhead: {
    fontSize: 32,
    fontFamily: fontsLoaded ? "DMSans_400Regular" : "System", 
    color: colors.dark.black,
  },
  h1: {
    fontSize: 32,
    fontFamily: fontsLoaded ? "DMSans_500Medium" : "System", 
    color: colors.other.black,
  },
  h2: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: colors.other.black,
  },
  h2Med: {
    fontSize: 24,
    fontFamily: "DMSans_500Medium",
    color: colors.other.black,
  },
  h2Crossed: {
    fontSize: 24,
    fontFamily: "DMSans_400Regular",
    color: colors.other.black,
    textDecorationLine: "line-through",
  },
  h3: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: colors.other.black,
  },
  h3Med: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    color: colors.other.black,
  },
  h3Italic: {
    fontSize: 20,
    fontFamily: "DMSans_400Regular",
    fontStyle: "italic",
    color: colors.other.black,
  },
  h4: {
    fontSize: 18,
    fontFamily: "DMSans_400Regular",
    color: colors.other.black,
  },
  h4Med: {
    fontSize: 18,
    fontFamily: "DMSans_500Medium",
    color: colors.other.black,
  },
  h4Bold: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: colors.other.black,
  },
  footnote: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: colors.other.black,
  },
  footnoteItalic: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    fontStyle: "italic",
    color: colors.other.black,
  },
  emoji56: {
    fontSize: 56,
    color: colors.other.black,
  },
  emoji80: {
    fontSize: 80,
    color: colors.other.black,
  },
  body: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: colors.other.black,
  },
  bodyItalic: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    fontStyle: "italic",
    color: colors.other.black,
  },
  bodyBold: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: colors.other.black,
  },
  bodyMed: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: colors.other.black,
  },
  bodyCrossed: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: colors.other.black,
    textDecorationLine: "line-through",
  },
});