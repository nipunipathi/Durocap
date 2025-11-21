import { RequireAuth as MiaodaRequireAuth } from "miaoda-auth-react";

interface RequireAuthProps {
  whiteList?: string[];
  children: React.ReactNode;
}

export function RequireAuth({ whiteList, children }: RequireAuthProps) {
  return <MiaodaRequireAuth whiteList={whiteList}>{children}</MiaodaRequireAuth>;
}
