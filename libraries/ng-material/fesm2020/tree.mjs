import * as i1 from '@takkion/ng-cdk/tree';
import {
  CdkTreeNode,
  CdkTreeNodeDef,
  CdkNestedTreeNode,
  CDK_TREE_NODE_OUTLET_NODE,
  CdkTreeNodePadding,
  CdkTreeNodeOutlet,
  CdkTree,
  CdkTreeNodeToggle,
  CdkTreeModule,
} from '@takkion/ng-cdk/tree';
import * as i0 from '@angular/core';
import {
  Directive,
  Attribute,
  Input,
  Inject,
  Optional,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  NgModule,
} from '@angular/core';
import { mixinTabIndex, mixinDisabled, TakCommonModule } from '@takkion/ng-material/core';
import { coerceBooleanProperty } from '@takkion/ng-cdk/coercion';
import { DataSource } from '@takkion/ng-cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { take, map } from 'rxjs/operators';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _TakTreeNodeBase = mixinTabIndex(mixinDisabled(CdkTreeNode));
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
class TakTreeNode extends _TakTreeNodeBase {
  constructor(elementRef, tree, tabIndex) {
    super(elementRef, tree);
    this.tabIndex = Number(tabIndex) || 0;
  }
  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.
  ngOnInit() {
    super.ngOnInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
TakTreeNode.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNode,
  deps: [{ token: i0.ElementRef }, { token: i1.CdkTree }, { token: 'tabindex', attribute: true }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakTreeNode.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTreeNode,
  selector: 'tak-tree-node',
  inputs: { role: 'role', disabled: 'disabled', tabIndex: 'tabIndex' },
  host: { classAttribute: 'tak-tree-node' },
  providers: [{ provide: CdkTreeNode, useExisting: TakTreeNode }],
  exportAs: ['takTreeNode'],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNode,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-tree-node',
          exportAs: 'takTreeNode',
          inputs: ['role', 'disabled', 'tabIndex'],
          providers: [{ provide: CdkTreeNode, useExisting: TakTreeNode }],
          host: {
            class: 'tak-tree-node',
          },
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.CdkTree },
      {
        type: undefined,
        decorators: [
          {
            type: Attribute,
            args: ['tabindex'],
          },
        ],
      },
    ];
  },
});
/**
 * Wrapper for the CdkTree node definition with Material design styles.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
class TakTreeNodeDef extends CdkTreeNodeDef {}
TakTreeNodeDef.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeDef,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakTreeNodeDef.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTreeNodeDef,
  selector: '[takTreeNodeDef]',
  inputs: { when: ['takTreeNodeDefWhen', 'when'], data: ['takTreeNode', 'data'] },
  providers: [{ provide: CdkTreeNodeDef, useExisting: TakTreeNodeDef }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeDef,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takTreeNodeDef]',
          inputs: ['when: takTreeNodeDefWhen'],
          providers: [{ provide: CdkTreeNodeDef, useExisting: TakTreeNodeDef }],
        },
      ],
    },
  ],
  propDecorators: {
    data: [
      {
        type: Input,
        args: ['takTreeNode'],
      },
    ],
  },
});
/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
class TakNestedTreeNode extends CdkNestedTreeNode {
  constructor(elementRef, tree, differs, tabIndex) {
    super(elementRef, tree, differs);
    this._disabled = false;
    this.tabIndex = Number(tabIndex) || 0;
  }
  /** Whether the node is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  /** Tabindex for the node. */
  get tabIndex() {
    return this.disabled ? -1 : this._tabIndex;
  }
  set tabIndex(value) {
    // If the specified tabIndex value is null or undefined, fall back to the default value.
    this._tabIndex = value != null ? value : 0;
  }
  // This is a workaround for https://github.com/angular/angular/issues/19145
  // In aot mode, the lifecycle hooks from parent class are not called.
  // TODO(tinayuangao): Remove when the angular issue #19145 is fixed
  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
TakNestedTreeNode.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNestedTreeNode,
  deps: [
    { token: i0.ElementRef },
    { token: i1.CdkTree },
    { token: i0.IterableDiffers },
    { token: 'tabindex', attribute: true },
  ],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakNestedTreeNode.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakNestedTreeNode,
  selector: 'tak-nested-tree-node',
  inputs: {
    role: 'role',
    disabled: 'disabled',
    tabIndex: 'tabIndex',
    node: ['takNestedTreeNode', 'node'],
  },
  host: { classAttribute: 'tak-nested-tree-node' },
  providers: [
    { provide: CdkNestedTreeNode, useExisting: TakNestedTreeNode },
    { provide: CdkTreeNode, useExisting: TakNestedTreeNode },
    { provide: CDK_TREE_NODE_OUTLET_NODE, useExisting: TakNestedTreeNode },
  ],
  exportAs: ['takNestedTreeNode'],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNestedTreeNode,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: 'tak-nested-tree-node',
          exportAs: 'takNestedTreeNode',
          inputs: ['role', 'disabled', 'tabIndex'],
          providers: [
            { provide: CdkNestedTreeNode, useExisting: TakNestedTreeNode },
            { provide: CdkTreeNode, useExisting: TakNestedTreeNode },
            { provide: CDK_TREE_NODE_OUTLET_NODE, useExisting: TakNestedTreeNode },
          ],
          host: {
            class: 'tak-nested-tree-node',
          },
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i1.CdkTree },
      { type: i0.IterableDiffers },
      {
        type: undefined,
        decorators: [
          {
            type: Attribute,
            args: ['tabindex'],
          },
        ],
      },
    ];
  },
  propDecorators: {
    node: [
      {
        type: Input,
        args: ['takNestedTreeNode'],
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    tabIndex: [
      {
        type: Input,
      },
    ],
  },
});

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
class TakTreeNodePadding extends CdkTreeNodePadding {
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level() {
    return this._level;
  }
  set level(value) {
    this._setLevelInput(value);
  }
  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  get indent() {
    return this._indent;
  }
  set indent(indent) {
    this._setIndentInput(indent);
  }
}
TakTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodePadding,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTreeNodePadding,
  selector: '[takTreeNodePadding]',
  inputs: {
    level: ['takTreeNodePadding', 'level'],
    indent: ['takTreeNodePaddingIndent', 'indent'],
  },
  providers: [{ provide: CdkTreeNodePadding, useExisting: TakTreeNodePadding }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodePadding,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takTreeNodePadding]',
          providers: [{ provide: CdkTreeNodePadding, useExisting: TakTreeNodePadding }],
        },
      ],
    },
  ],
  propDecorators: {
    level: [
      {
        type: Input,
        args: ['takTreeNodePadding'],
      },
    ],
    indent: [
      {
        type: Input,
        args: ['takTreeNodePaddingIndent'],
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Outlet for nested CdkNode. Put `[takTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
class TakTreeNodeOutlet {
  constructor(viewContainer, _node) {
    this.viewContainer = viewContainer;
    this._node = _node;
  }
}
TakTreeNodeOutlet.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeOutlet,
  deps: [{ token: i0.ViewContainerRef }, { token: CDK_TREE_NODE_OUTLET_NODE, optional: true }],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakTreeNodeOutlet.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTreeNodeOutlet,
  selector: '[takTreeNodeOutlet]',
  providers: [
    {
      provide: CdkTreeNodeOutlet,
      useExisting: TakTreeNodeOutlet,
    },
  ],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeOutlet,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takTreeNodeOutlet]',
          providers: [
            {
              provide: CdkTreeNodeOutlet,
              useExisting: TakTreeNodeOutlet,
            },
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ViewContainerRef },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [CDK_TREE_NODE_OUTLET_NODE],
          },
          {
            type: Optional,
          },
        ],
      },
    ];
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper for the CdkTable with Material design styles.
 */
class TakTree extends CdkTree {}
TakTree.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTree,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakTree.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTree,
  selector: 'tak-tree',
  host: { attributes: { role: 'tree' }, classAttribute: 'tak-tree' },
  providers: [{ provide: CdkTree, useExisting: TakTree }],
  viewQueries: [
    {
      propertyName: '_nodeOutlet',
      first: true,
      predicate: TakTreeNodeOutlet,
      descendants: true,
      static: true,
    },
  ],
  exportAs: ['takTree'],
  usesInheritance: true,
  ngImport: i0,
  template: `<ng-container takTreeNodeOutlet></ng-container>`,
  isInline: true,
  styles: [
    '.tak-tree{display:block}.tak-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word}.tak-nested-tree-node{border-bottom-width:0}',
  ],
  dependencies: [{ kind: 'directive', type: TakTreeNodeOutlet, selector: '[takTreeNodeOutlet]' }],
  changeDetection: i0.ChangeDetectionStrategy.Default,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTree,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-tree',
          exportAs: 'takTree',
          template: `<ng-container takTreeNodeOutlet></ng-container>`,
          host: {
            class: 'tak-tree',
            role: 'tree',
          },
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.Default,
          providers: [{ provide: CdkTree, useExisting: TakTree }],
          styles: [
            '.tak-tree{display:block}.tak-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word}.tak-nested-tree-node{border-bottom-width:0}',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    _nodeOutlet: [
      {
        type: ViewChild,
        args: [TakTreeNodeOutlet, { static: true }],
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
class TakTreeNodeToggle extends CdkTreeNodeToggle {}
TakTreeNodeToggle.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeToggle,
  deps: null,
  target: i0.ɵɵFactoryTarget.Directive,
});
TakTreeNodeToggle.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakTreeNodeToggle,
  selector: '[takTreeNodeToggle]',
  inputs: { recursive: ['takTreeNodeToggleRecursive', 'recursive'] },
  providers: [{ provide: CdkTreeNodeToggle, useExisting: TakTreeNodeToggle }],
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeNodeToggle,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[takTreeNodeToggle]',
          providers: [{ provide: CdkTreeNodeToggle, useExisting: TakTreeNodeToggle }],
          inputs: ['recursive: takTreeNodeToggleRecursive'],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const TAK_TREE_DIRECTIVES = [
  TakNestedTreeNode,
  TakTreeNodeDef,
  TakTreeNodePadding,
  TakTreeNodeToggle,
  TakTree,
  TakTreeNode,
  TakTreeNodeOutlet,
];
class TakTreeModule {}
TakTreeModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeModule,
  declarations: [
    TakNestedTreeNode,
    TakTreeNodeDef,
    TakTreeNodePadding,
    TakTreeNodeToggle,
    TakTree,
    TakTreeNode,
    TakTreeNodeOutlet,
  ],
  imports: [CdkTreeModule, TakCommonModule],
  exports: [
    TakCommonModule,
    TakNestedTreeNode,
    TakTreeNodeDef,
    TakTreeNodePadding,
    TakTreeNodeToggle,
    TakTree,
    TakTreeNode,
    TakTreeNodeOutlet,
  ],
});
TakTreeModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeModule,
  imports: [CdkTreeModule, TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakTreeModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CdkTreeModule, TakCommonModule],
          exports: [TakCommonModule, TAK_TREE_DIRECTIVES],
          declarations: TAK_TREE_DIRECTIVES,
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 */
class TakTreeFlattener {
  constructor(transformFunction, getLevel, isExpandable, getChildren) {
    this.transformFunction = transformFunction;
    this.getLevel = getLevel;
    this.isExpandable = isExpandable;
    this.getChildren = getChildren;
  }
  _flattenNode(node, level, resultNodes, parentMap) {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);
    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (childrenNodes) {
        if (Array.isArray(childrenNodes)) {
          this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
        } else {
          childrenNodes.pipe(take(1)).subscribe(children => {
            this._flattenChildren(children, level, resultNodes, parentMap);
          });
        }
      }
    }
    return resultNodes;
  }
  _flattenChildren(children, level, resultNodes, parentMap) {
    children.forEach((child, index) => {
      let childParentMap = parentMap.slice();
      childParentMap.push(index != children.length - 1);
      this._flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }
  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData) {
    let resultNodes = [];
    structuredData.forEach(node => this._flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }
  /**
   * Expand flattened node with current expansion status.
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes, treeControl) {
    let results = [];
    let currentExpand = [];
    currentExpand[0] = true;
    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }
}
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `TakTree`.
 * The nested tree nodes of type `T` are flattened through `TakTreeFlattener`, and converted
 * to type `F` for `TakTree` to consume.
 */
class TakTreeFlatDataSource extends DataSource {
  constructor(_treeControl, _treeFlattener, initialData) {
    super();
    this._treeControl = _treeControl;
    this._treeFlattener = _treeFlattener;
    this._flattenedData = new BehaviorSubject([]);
    this._expandedData = new BehaviorSubject([]);
    this._data = new BehaviorSubject([]);
    if (initialData) {
      // Assign the data through the constructor to ensure that all of the logic is executed.
      this.data = initialData;
    }
  }
  get data() {
    return this._data.value;
  }
  set data(value) {
    this._data.next(value);
    this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
    this._treeControl.dataNodes = this._flattenedData.value;
  }
  connect(collectionViewer) {
    return merge(
      collectionViewer.viewChange,
      this._treeControl.expansionModel.changed,
      this._flattenedData
    ).pipe(
      map(() => {
        this._expandedData.next(
          this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl)
        );
        return this._expandedData.value;
      })
    );
  }
  disconnect() {
    // no op
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
class TakTreeNestedDataSource extends DataSource {
  constructor() {
    super(...arguments);
    this._data = new BehaviorSubject([]);
  }
  /**
   * Data for the nested tree
   */
  get data() {
    return this._data.value;
  }
  set data(value) {
    this._data.next(value);
  }
  connect(collectionViewer) {
    return merge(...[collectionViewer.viewChange, this._data]).pipe(map(() => this.data));
  }
  disconnect() {
    // no op
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
  TakNestedTreeNode,
  TakTree,
  TakTreeFlatDataSource,
  TakTreeFlattener,
  TakTreeModule,
  TakTreeNestedDataSource,
  TakTreeNode,
  TakTreeNodeDef,
  TakTreeNodeOutlet,
  TakTreeNodePadding,
  TakTreeNodeToggle,
};
//# sourceMappingURL=tree.mjs.map
