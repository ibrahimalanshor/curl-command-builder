import * as layouts from 'src/components/layouts';

export function useDynamicLayout(app) {
  for (const layout in layouts) {
    app.component(layouts[layout].name, layouts[layout]);
  }
}
