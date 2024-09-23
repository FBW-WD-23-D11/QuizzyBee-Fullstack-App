const ueberallVerfuegbar = "ueberallVerfuegbar";

const test = () => {
  console.log("logged: ueberallVerfuegbar", ueberallVerfuegbar);
  const nichtInGlobalenScopeVerfuegbar = "nichtInGlobalenScopeVerfuegbar";

  console.log(nurInTestInnerVerfuegbar);
  const testInner = () => {
    const nurInTestInnerVerfuegbar = "nurInTestInnerVerfuegbar";
  };
};
