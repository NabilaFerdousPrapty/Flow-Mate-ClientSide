import Container from "@/components/Container";
// import { ShineBorder } from "@/components/ui/border";
import { useTheme } from "next-themes";
// import photo from '../../../assets/bn.png'
import photo from '../../../assets/slider1.png'
;
export function BannerImage() {
  const theme = useTheme();
  
  return (
    <Container className="my-8 md:my-10">
      {/* <ShineBorder
        className="text-center text-2xl font-bold capitalize"
        color={theme.theme === "dark" ? "white" : "black"}
      > */}
        <Container className="w-full py-5">
          <img
            className="w-full rounded-[14px] shadow-2xl border "
            src={photo}
            alt=""
          />
        </Container>
      {/* </ShineBorder> */}
    </Container>
  );
}
