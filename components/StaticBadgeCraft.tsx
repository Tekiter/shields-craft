import { forwardRef, useState } from "react";
import { Grid } from "semantic-ui-react";
import { SelectStyleType } from "@/components/panels/SelectStyleType";
import { StaticContent } from "@/components/panels/StaticContent";
import { StaticBadge } from "@/utils/badge";

export interface StaticBadgeCraftProps {
  onChange?(style: StaticBadge): void;
}

export const StaticBadgeCraft = forwardRef<any, StaticBadgeCraftProps>(
  (props, ref) => {
    const { onChange = () => {} } = props;

    const [badge, setBadge] = useState<StaticBadge>({
      label: "shields.io",
      message: "badge",
      color: "blue",
    });

    const handleChange = (values: object) => {
      const newBadge = { ...badge, ...values };
      setBadge(newBadge);
      onChange(newBadge);
    };

    return (
      <Grid ref={ref} divided columns={2}>
        <Grid.Column>
          <StaticContent onChange={handleChange} />
        </Grid.Column>
        <Grid.Column>
          <SelectStyleType onChange={handleChange} />
        </Grid.Column>
      </Grid>
    );
  }
);
