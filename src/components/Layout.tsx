import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "התחזית" },
  { to: "/report", label: "הדוח היומי" },
  { to: "/polls", label: "הסקרים" },
  { to: "/sources", label: "מקרא המקורות" },
  { to: "/methodology", label: "המתודולוגיה" },
  { to: "/simulator", label: "הסימולטור" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="text-lg font-black tracking-tight">מדד הבחירות</span>
            <span className="text-xs text-muted-foreground">כנסת ה-26</span>
          </Link>
          <nav className="-mx-1 flex items-center gap-1 overflow-x-auto">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-sm text-muted-foreground">
          <p>
            מדד הבחירות הוא מודל סטטיסטי, לא נבואה. הוא מסכם את הסקרים שפורסמו ומכמת
            את אי-הוודאות סביבם — כולל את האפשרות שכל הסקרים טועים יחד באותו כיוון,
            כפי שקרה ב-2015 וב-2022.
          </p>
          <p>
            <Link to="/methodology" className="text-primary hover:underline">
              כל שלב בחישוב מתועד במלואו
            </Link>
            , והנתונים הגולמיים ניתנים להורדה מ־
            <code className="ltr mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">
              /data/polls.json
            </code>
            . תחזית שלא ניתן לבדוק אינה שווה דבר.
          </p>
        </div>
      </footer>
    </div>
  );
}
