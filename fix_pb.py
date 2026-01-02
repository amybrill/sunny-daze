import os
path = 'src/pages/Index.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

with open(path, 'w') as f:
    for line in lines:
        if "if (t === 'powerball')" in line:
            # This replaces the line entirely with the 5+1 logic
            f.write("    if (t === 'powerball') return `White: ${r(69, 5)} | Red: ${Math.floor(Math.random() * 26) + 1}`;\n")
        else:
            f.write(line)
