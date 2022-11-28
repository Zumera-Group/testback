const Spacing = {
  value: (v: number) => v * 8 + 'px',
};

const spaces = [];
let i = 0;
while (i < 40) {
  spaces.push(i);
  i = i + 0.5;
}

export const appSpaces = {};

spaces.forEach((a) => {
  appSpaces[a] = Spacing.value(a);
});
