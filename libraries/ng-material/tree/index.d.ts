import { _AbstractConstructor } from '@takkion/ng-material/core';
import { AfterContentInit } from '@angular/core';
import { BooleanInput } from '@takkion/ng-cdk/coercion';
import { CanDisable } from '@takkion/ng-material/core';
import { CdkNestedTreeNode } from '@takkion/ng-cdk/tree';
import { CdkTree } from '@takkion/ng-cdk/tree';
import { CdkTreeNode } from '@takkion/ng-cdk/tree';
import { CdkTreeNodeDef } from '@takkion/ng-cdk/tree';
import { CdkTreeNodeOutlet } from '@takkion/ng-cdk/tree';
import { CdkTreeNodePadding } from '@takkion/ng-cdk/tree';
import { CdkTreeNodeToggle } from '@takkion/ng-cdk/tree';
import { CollectionViewer } from '@takkion/ng-cdk/collections';
import { _Constructor } from '@takkion/ng-material/core';
import { DataSource } from '@takkion/ng-cdk/collections';
import { ElementRef } from '@angular/core';
import { FlatTreeControl } from '@takkion/ng-cdk/tree';
import { HasTabIndex } from '@takkion/ng-material/core';
import * as i0 from '@angular/core';
import * as i6 from '@takkion/ng-cdk/tree';
import * as i7 from '@takkion/ng-material/core';
import { IterableDiffers } from '@angular/core';
import { NumberInput } from '@takkion/ng-cdk/coercion';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TreeControl } from '@takkion/ng-cdk/tree';
import { ViewContainerRef } from '@angular/core';

declare namespace i1 {
  export { TakTreeNode, TakTreeNodeDef, TakNestedTreeNode };
}

declare namespace i2 {
  export { TakTreeNodePadding };
}

declare namespace i3 {
  export { TakTreeNodeToggle };
}

declare namespace i4 {
  export { TakTree };
}

declare namespace i5 {
  export { TakTreeNodeOutlet };
}

/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
export declare class TakNestedTreeNode<T, K = T>
  extends CdkNestedTreeNode<T, K>
  implements AfterContentInit, OnDestroy, OnInit
{
  node: T;
  /** Whether the node is disabled. */
  get disabled(): boolean;
  set disabled(value: BooleanInput);
  private _disabled;
  /** Tabindex for the node. */
  get tabIndex(): number;
  set tabIndex(value: number);
  private _tabIndex;
  constructor(
    elementRef: ElementRef<HTMLElement>,
    tree: CdkTree<T, K>,
    differs: IterableDiffers,
    tabIndex: string
  );
  ngOnInit(): void;
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakNestedTreeNode<any, any>,
    [null, null, null, { attribute: 'tabindex' }]
  >;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakNestedTreeNode<any, any>,
    'tak-nested-tree-node',
    ['takNestedTreeNode'],
    { role: 'role'; disabled: 'disabled'; tabIndex: 'tabIndex'; node: 'takNestedTreeNode' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Wrapper for the CdkTable with Material design styles.
 */
export declare class TakTree<T, K = T> extends CdkTree<T, K> {
  _nodeOutlet: TakTreeNodeOutlet;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTree<any, any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TakTree<any, any>,
    'tak-tree',
    ['takTree'],
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `TakTree`.
 * The nested tree nodes of type `T` are flattened through `TakTreeFlattener`, and converted
 * to type `F` for `TakTree` to consume.
 */
export declare class TakTreeFlatDataSource<T, F, K = F> extends DataSource<F> {
  private _treeControl;
  private _treeFlattener;
  private readonly _flattenedData;
  private readonly _expandedData;
  get data(): T[];
  set data(value: T[]);
  private readonly _data;
  constructor(
    _treeControl: FlatTreeControl<F, K>,
    _treeFlattener: TakTreeFlattener<T, F, K>,
    initialData?: T[]
  );
  connect(collectionViewer: CollectionViewer): Observable<F[]>;
  disconnect(): void;
}

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
export declare class TakTreeFlattener<T, F, K = F> {
  transformFunction: (node: T, level: number) => F;
  getLevel: (node: F) => number;
  isExpandable: (node: F) => boolean;
  getChildren: (node: T) => Observable<T[]> | T[] | undefined | null;
  constructor(
    transformFunction: (node: T, level: number) => F,
    getLevel: (node: F) => number,
    isExpandable: (node: F) => boolean,
    getChildren: (node: T) => Observable<T[]> | T[] | undefined | null
  );
  _flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[];
  _flattenChildren(children: T[], level: number, resultNodes: F[], parentMap: boolean[]): void;
  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData: T[]): F[];
  /**
   * Expand flattened node with current expansion status.
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F, K>): F[];
}

export declare class TakTreeModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTreeModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    TakTreeModule,
    [
      typeof i1.TakNestedTreeNode,
      typeof i1.TakTreeNodeDef,
      typeof i2.TakTreeNodePadding,
      typeof i3.TakTreeNodeToggle,
      typeof i4.TakTree,
      typeof i1.TakTreeNode,
      typeof i5.TakTreeNodeOutlet,
    ],
    [typeof i6.CdkTreeModule, typeof i7.TakCommonModule],
    [
      typeof i7.TakCommonModule,
      typeof i1.TakNestedTreeNode,
      typeof i1.TakTreeNodeDef,
      typeof i2.TakTreeNodePadding,
      typeof i3.TakTreeNodeToggle,
      typeof i4.TakTree,
      typeof i1.TakTreeNode,
      typeof i5.TakTreeNodeOutlet,
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<TakTreeModule>;
}

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
export declare class TakTreeNestedDataSource<T> extends DataSource<T> {
  /**
   * Data for the nested tree
   */
  get data(): T[];
  set data(value: T[]);
  private readonly _data;
  connect(collectionViewer: CollectionViewer): Observable<T[]>;
  disconnect(): void;
}

/**
 * Wrapper for the CdkTree node with Material design styles.
 */
export declare class TakTreeNode<T, K = T>
  extends _TakTreeNodeBase<T, K>
  implements CanDisable, HasTabIndex, OnInit, OnDestroy
{
  constructor(elementRef: ElementRef<HTMLElement>, tree: CdkTree<T, K>, tabIndex: string);
  ngOnInit(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    TakTreeNode<any, any>,
    [null, null, { attribute: 'tabindex' }]
  >;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakTreeNode<any, any>,
    'tak-tree-node',
    ['takTreeNode'],
    { role: 'role'; disabled: 'disabled'; tabIndex: 'tabIndex' },
    {},
    never,
    never,
    false
  >;
}

declare const _TakTreeNodeBase: _Constructor<HasTabIndex> &
  _AbstractConstructor<HasTabIndex> &
  _Constructor<CanDisable> &
  _AbstractConstructor<CanDisable> &
  typeof CdkTreeNode;

/**
 * Wrapper for the CdkTree node definition with Material design styles.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
export declare class TakTreeNodeDef<T> extends CdkTreeNodeDef<T> {
  data: T;
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTreeNodeDef<any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakTreeNodeDef<any>,
    '[takTreeNodeDef]',
    never,
    { when: 'takTreeNodeDefWhen'; data: 'takTreeNode' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Outlet for nested CdkNode. Put `[takTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
export declare class TakTreeNodeOutlet implements CdkTreeNodeOutlet {
  viewContainer: ViewContainerRef;
  _node?: any;
  constructor(viewContainer: ViewContainerRef, _node?: any);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTreeNodeOutlet, [null, { optional: true }]>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakTreeNodeOutlet,
    '[takTreeNodeOutlet]',
    never,
    {},
    {},
    never,
    never,
    false
  >;
}

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
export declare class TakTreeNodePadding<T, K = T> extends CdkTreeNodePadding<T, K> {
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level(): number;
  set level(value: NumberInput);
  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  get indent(): number | string;
  set indent(indent: number | string);
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTreeNodePadding<any, any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakTreeNodePadding<any, any>,
    '[takTreeNodePadding]',
    never,
    { level: 'takTreeNodePadding'; indent: 'takTreeNodePaddingIndent' },
    {},
    never,
    never,
    false
  >;
}

/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
export declare class TakTreeNodeToggle<T, K = T> extends CdkTreeNodeToggle<T, K> {
  static ɵfac: i0.ɵɵFactoryDeclaration<TakTreeNodeToggle<any, any>, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TakTreeNodeToggle<any, any>,
    '[takTreeNodeToggle]',
    never,
    { recursive: 'takTreeNodeToggleRecursive' },
    {},
    never,
    never,
    false
  >;
}

export {};
