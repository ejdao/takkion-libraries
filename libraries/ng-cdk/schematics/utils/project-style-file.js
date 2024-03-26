'use strict';
/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProjectStyleFile = void 0;
const core_1 = require('@angular-devkit/core');
const project_targets_1 = require('./project-targets');
/** Regular expression that matches all possible Angular CLI default style files. */
const defaultStyleFileRegex = /styles\.(c|le|sc)ss/;
/** Regular expression that matches all files that have a proper stylesheet extension. */
const validStyleFileRegex = /\.(c|le|sc)ss/;
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
function getProjectStyleFile(project, extension) {
  const buildOptions = (0, project_targets_1.getProjectTargetOptions)(project, 'build');
  if (
    buildOptions.styles &&
    (0, core_1.isJsonArray)(buildOptions.styles) &&
    buildOptions.styles.length
  ) {
    const styles = buildOptions.styles.map(s => (typeof s === 'string' ? s : s.input));
    // Look for the default style file that is generated for new projects by the Angular CLI. This
    // default style file is usually called `styles.ext` unless it has been changed explicitly.
    const defaultMainStylePath = styles.find(file =>
      extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file)
    );
    if (defaultMainStylePath) {
      return (0, core_1.normalize)(defaultMainStylePath);
    }
    // If no default style file could be found, use the first style file that matches the given
    // extension. If no extension specified explicitly, we look for any file with a valid style
    // file extension.
    const fallbackStylePath = styles.find(file =>
      extension ? file.endsWith(`.${extension}`) : validStyleFileRegex.test(file)
    );
    if (fallbackStylePath) {
      return (0, core_1.normalize)(fallbackStylePath);
    }
  }
  return null;
}
exports.getProjectStyleFile = getProjectStyleFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1zdHlsZS1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9zY2hlbWF0aWNzL3V0aWxzL3Byb2plY3Qtc3R5bGUtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCwrQ0FBNEQ7QUFFNUQsdURBQTBEO0FBRTFELG9GQUFvRjtBQUNwRixNQUFNLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBRXBELHlGQUF5RjtBQUN6RixNQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztBQUU1Qzs7O0dBR0c7QUFDSCxTQUFnQixtQkFBbUIsQ0FBQyxPQUEwQixFQUFFLFNBQWtCO0lBQ2hGLE1BQU0sWUFBWSxHQUFHLElBQUEseUNBQXVCLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxJQUFBLGtCQUFXLEVBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ3pGLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3pDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFxQixDQUFDLEtBQUssQ0FDekQsQ0FBQztRQUVGLDhGQUE4RjtRQUM5RiwyRkFBMkY7UUFDM0YsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQzlDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDOUUsQ0FBQztRQUVGLElBQUksb0JBQW9CLEVBQUU7WUFDeEIsT0FBTyxJQUFBLGdCQUFTLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4QztRQUVELDJGQUEyRjtRQUMzRiwyRkFBMkY7UUFDM0Ysa0JBQWtCO1FBQ2xCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUMzQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzVFLENBQUM7UUFFRixJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLE9BQU8sSUFBQSxnQkFBUyxFQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckM7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQTlCRCxrREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc0pzb25BcnJheSwgbm9ybWFsaXplfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1Byb2plY3REZWZpbml0aW9ufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZS9zcmMvd29ya3NwYWNlJztcbmltcG9ydCB7Z2V0UHJvamVjdFRhcmdldE9wdGlvbnN9IGZyb20gJy4vcHJvamVjdC10YXJnZXRzJztcblxuLyoqIFJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IG1hdGNoZXMgYWxsIHBvc3NpYmxlIEFuZ3VsYXIgQ0xJIGRlZmF1bHQgc3R5bGUgZmlsZXMuICovXG5jb25zdCBkZWZhdWx0U3R5bGVGaWxlUmVnZXggPSAvc3R5bGVzXFwuKGN8bGV8c2Mpc3MvO1xuXG4vKiogUmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyBhbGwgZmlsZXMgdGhhdCBoYXZlIGEgcHJvcGVyIHN0eWxlc2hlZXQgZXh0ZW5zaW9uLiAqL1xuY29uc3QgdmFsaWRTdHlsZUZpbGVSZWdleCA9IC9cXC4oY3xsZXxzYylzcy87XG5cbi8qKlxuICogR2V0cyBhIHN0eWxlIGZpbGUgd2l0aCB0aGUgZ2l2ZW4gZXh0ZW5zaW9uIGluIGEgcHJvamVjdCBhbmQgcmV0dXJucyBpdHMgcGF0aC4gSWYgbm9cbiAqIGV4dGVuc2lvbiBpcyBzcGVjaWZpZWQsIGFueSBzdHlsZSBmaWxlIHdpdGggYSB2YWxpZCBleHRlbnNpb24gd2lsbCBiZSByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RTdHlsZUZpbGUocHJvamVjdDogUHJvamVjdERlZmluaXRpb24sIGV4dGVuc2lvbj86IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBidWlsZE9wdGlvbnMgPSBnZXRQcm9qZWN0VGFyZ2V0T3B0aW9ucyhwcm9qZWN0LCAnYnVpbGQnKTtcbiAgaWYgKGJ1aWxkT3B0aW9ucy5zdHlsZXMgJiYgaXNKc29uQXJyYXkoYnVpbGRPcHRpb25zLnN0eWxlcykgJiYgYnVpbGRPcHRpb25zLnN0eWxlcy5sZW5ndGgpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBidWlsZE9wdGlvbnMuc3R5bGVzLm1hcChzID0+XG4gICAgICB0eXBlb2YgcyA9PT0gJ3N0cmluZycgPyBzIDogKHMgYXMge2lucHV0OiBzdHJpbmd9KS5pbnB1dCxcbiAgICApO1xuXG4gICAgLy8gTG9vayBmb3IgdGhlIGRlZmF1bHQgc3R5bGUgZmlsZSB0aGF0IGlzIGdlbmVyYXRlZCBmb3IgbmV3IHByb2plY3RzIGJ5IHRoZSBBbmd1bGFyIENMSS4gVGhpc1xuICAgIC8vIGRlZmF1bHQgc3R5bGUgZmlsZSBpcyB1c3VhbGx5IGNhbGxlZCBgc3R5bGVzLmV4dGAgdW5sZXNzIGl0IGhhcyBiZWVuIGNoYW5nZWQgZXhwbGljaXRseS5cbiAgICBjb25zdCBkZWZhdWx0TWFpblN0eWxlUGF0aCA9IHN0eWxlcy5maW5kKGZpbGUgPT5cbiAgICAgIGV4dGVuc2lvbiA/IGZpbGUgPT09IGBzdHlsZXMuJHtleHRlbnNpb259YCA6IGRlZmF1bHRTdHlsZUZpbGVSZWdleC50ZXN0KGZpbGUpLFxuICAgICk7XG5cbiAgICBpZiAoZGVmYXVsdE1haW5TdHlsZVBhdGgpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUoZGVmYXVsdE1haW5TdHlsZVBhdGgpO1xuICAgIH1cblxuICAgIC8vIElmIG5vIGRlZmF1bHQgc3R5bGUgZmlsZSBjb3VsZCBiZSBmb3VuZCwgdXNlIHRoZSBmaXJzdCBzdHlsZSBmaWxlIHRoYXQgbWF0Y2hlcyB0aGUgZ2l2ZW5cbiAgICAvLyBleHRlbnNpb24uIElmIG5vIGV4dGVuc2lvbiBzcGVjaWZpZWQgZXhwbGljaXRseSwgd2UgbG9vayBmb3IgYW55IGZpbGUgd2l0aCBhIHZhbGlkIHN0eWxlXG4gICAgLy8gZmlsZSBleHRlbnNpb24uXG4gICAgY29uc3QgZmFsbGJhY2tTdHlsZVBhdGggPSBzdHlsZXMuZmluZChmaWxlID0+XG4gICAgICBleHRlbnNpb24gPyBmaWxlLmVuZHNXaXRoKGAuJHtleHRlbnNpb259YCkgOiB2YWxpZFN0eWxlRmlsZVJlZ2V4LnRlc3QoZmlsZSksXG4gICAgKTtcblxuICAgIGlmIChmYWxsYmFja1N0eWxlUGF0aCkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShmYWxsYmFja1N0eWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=
