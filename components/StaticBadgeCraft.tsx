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

    const handleContent = ({ label, message }) => {
      const newBadge = { ...badge, label, message };
      setBadge(newBadge);
      onChange(newBadge);
    };

    const handleChange = (values) => {
      const newBadge = { ...badge, ...values };
      setBadge(newBadge);
      onChange(newBadge);
    };

    return (
      <Grid divided columns={2}>
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
