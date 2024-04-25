import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FlatTreeControl } from '@takkion/cdk/tree';
import { MatBottomSheet, MatBottomSheetRef } from '@takkion/material/bottom-sheet';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@takkion/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
  public hidden = false;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _bottomSheet: MatBottomSheet,
    href: ElementRef<HTMLElement>
  ) {
    href.nativeElement.classList.add('app-badge');
    this.dataSource.data = TREE_DATA;
  }

  public toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetExampleComponent);
  }

  public hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetExampleComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetExampleComponent>) {}

  public openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
