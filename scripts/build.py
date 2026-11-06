#!/usr/bin/env python3
"""Monta o index.html a partir de src/index.template.html + src/partials/.

Sem dependências (só Python 3). Uso:
    python3 scripts/build.py          gera/atualiza index.html
    python3 scripts/build.py --check  falha (exit 1) se index.html estiver desatualizado

Diretiva nos templates/parciais (a indentação da linha é preservada):
    <!-- @include pasta/arquivo -->     -> src/partials/pasta/arquivo.html
Parciais podem incluir outros parciais.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"
OUT = ROOT / "index.html"
DIRECTIVE = re.compile(r"^(?P<indent>[ \t]*)<!--\s*@include\s+(?P<name>[\w./-]+)\s*-->[ \t]*$")


def render(text: str, stack: tuple = ()) -> str:
    lines = []
    for line in text.split("\n"):
        m = DIRECTIVE.match(line)
        if not m:
            lines.append(line)
            continue
        name = m["name"]
        path = PARTIALS / f"{name}.html"
        if name in stack:
            sys.exit(f"Inclusão circular: {' -> '.join(stack + (name,))}")
        if not path.is_file():
            sys.exit(f"Parcial não encontrado: {path.relative_to(ROOT)} (incluído por '{stack[-1] if stack else 'template'}')")
        inner = render(path.read_text(encoding="utf-8").rstrip("\n"), stack + (name,))
        indent = m["indent"]
        lines.extend((indent + l) if l.strip() else l for l in inner.split("\n"))
    return "\n".join(lines)


def main() -> int:
    html = render((SRC / "index.template.html").read_text(encoding="utf-8"))
    if "--check" in sys.argv:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != html:
            print("index.html desatualizado. Rode: python3 scripts/build.py")
            return 1
        print("index.html está em dia.")
        return 0
    OUT.write_text(html, encoding="utf-8", newline="\n")
    print(f"Gerado {OUT.relative_to(ROOT)} ({len(html.encode('utf-8'))} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
