import sys
content = open('src/pages/Index.tsx').read()
old_line = "if (t === 'powerball') return `PB: ${r(69, 5)} [${Math.floor(Math.random() * 26) + 1}]`;"
# This ensures it generates 5 white and 1 red clearly
new_line = "if (t === 'powerball') return `PB: ${r(69, 5)} + PB: [${Math.floor(Math.random() * 26) + 1}]`;"
content = content.replace(old_line, new_line)
with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)
