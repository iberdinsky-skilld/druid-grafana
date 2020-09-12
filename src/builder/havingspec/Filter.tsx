import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { QueryBuilderProps, QueryBuilderOptions } from '../types';
import { Filter as FilterSelector } from '../filter';

export class Filter extends PureComponent<QueryBuilderProps> {
  constructor(props: QueryBuilderProps) {
    super(props);
    this.resetBuilder(['type', 'filter']);
    const { builder } = props.options;
    builder.type = 'filter';
  }

  resetBuilder = (properties: string[]) => {
    const { builder } = this.props.options;
    for (let key of Object.keys(builder)) {
      if (!properties.includes(key)) {
        delete builder[key];
      }
    }
  };

  onOptionsChange = (component: string, componentBuilderOptions: QueryBuilderOptions) => {
    const { options, onOptionsChange } = this.props;
    const { builder, settings } = options;
    builder[component] = componentBuilderOptions.builder;
    onOptionsChange({ ...options, builder, settings });
  };

  builderOptions = (component: string): QueryBuilderOptions => {
    const { builder, settings } = this.props.options;
    return { builder: builder[component] || {}, settings: settings || {} };
  };

  render() {
    return (
      <>
        <div className="gf-form">
          <div
            className={css`
              width: 300px;
            `}
          >
            <FilterSelector
              options={this.builderOptions('filter')}
              onOptionsChange={this.onOptionsChange.bind(this, 'filter')}
            />
          </div>
        </div>
      </>
    );
  }
}
