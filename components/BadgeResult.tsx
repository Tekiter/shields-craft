import { forwardRef } from "react";
import { Input } from "semantic-ui-react";

export interface BadgeResultProps {
  badge: any;
  url: string;
}

export const BadgeResult = forwardRef<any, BadgeResultProps>((props, ref) => {
  const { badge = <></> } = props;
  return (
    <div>
      <h1>Result</h1>
      <p>{badge}</p>
      <Input
        action={{
          color: "teal",
          labelPosition: "right",
          icon: "copy",
          content: "Copy",
        }}
        value={props.url}
      />
    </div>
  );
});
