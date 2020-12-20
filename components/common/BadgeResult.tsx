import { forwardRef } from "react";
import { Header, Segment } from "semantic-ui-react";

export interface BadgeResultProps {
  badge: any;
}

export const BadgeResult = forwardRef<any, BadgeResultProps>((props, ref) => {
  const { badge = <></> } = props;

  return (
    <Segment ref={ref}>
      <Header>Crafted Badge </Header>
      <Segment textAlign="center">{badge()}</Segment>
    </Segment>
  );
});
