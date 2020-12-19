import { forwardRef } from "react";
import { Grid } from "semantic-ui-react";
import { SelectStyleType } from "@/components/panels/SelectStyleType";

export interface StaticBadgeCraftProps {}

export const StaticBadgeCraft = forwardRef<any, StaticBadgeCraftProps>(
  (props, ref) => {
    return (
      <Grid>
        <Grid.Column>
          <SelectStyleType />
        </Grid.Column>
      </Grid>
    );
  }
);
