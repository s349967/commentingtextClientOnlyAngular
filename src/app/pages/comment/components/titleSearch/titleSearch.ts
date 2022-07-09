
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { tidslinje } from "../../../../models/tidslinje";
import { tidslinjeCommandWrapper } from "../../../../models/tidslinjeCommandWrapper";
import { title } from "../../../../models/title";
import { AfterContentChecked,AfterViewChecked } from '@angular/core';
@Component({
  selector: "titlesearch",
  templateUrl: "titleSearch.html"
})
export class titleSearchComponent implements OnChanges, OnInit {
  constructor(
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    //TESTING!!
    this.selectStart = 5;
    this.selectStartChangeFun()
  }
  ngAfterViewInit() {
 
    Promise.resolve().then(() => this.cdref.detectChanges());
  }


  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if(property == "selectStart")
        console.log("Child 1 detecting change. Value is now " + (changes[property].currentValue))

      if (property == "titleList") {
        console.log("Child 1 detecting change. Have a title list equal to" + (changes[property].currentValue))

      }
    }
 
  }

  //Get change in start and end of selection of text
  @Input('selectStart') selectStart: Number = new Number();
  @Output() selectStartChange: EventEmitter<Number> = new EventEmitter<Number>();

  selectStartChangeFun() {
    this.selectStartChange.emit(this.selectStart.valueOf());
  }

  //ID's used in HTML
  @ViewChild("titleselectTitles") titleselectTitles!: ElementRef;
  @ViewChild("btnGetText") btnGetText!: ElementRef;

  loadText() {
    console.log("Loading text equal to" + this.titleselectTitles.nativeElement.value);
  }
  @Input('selectEnd') selectEnd: Number = new Number();

  @Output() selectEndChange: EventEmitter<Number> = new EventEmitter<Number>();
  selectEndChangeFun() {
    this.selectEndChange.emit(this.selectEnd.valueOf());
  }


  //Send selected text between child components
  @Input('selectedText') selectedText:String = new String();
  @Output() selectedTextChange: EventEmitter<String> = new EventEmitter<String>();

  selectedTextChangeFun() {
    this.selectedTextChange.emit(this.selectedText.valueOf());
  }


  //Changes from server conserning comments
  @Input('commandTidslinjeWrapper') commandTidslinjeWrapper: Array<tidslinjeCommandWrapper> = new Array<tidslinjeCommandWrapper>();
  @Output() commandTidslinjeWrapperChange: EventEmitter<Array<tidslinjeCommandWrapper>> = new EventEmitter<Array<tidslinjeCommandWrapper>>();

  commandTidslinjeWrapperFun() {
    this.commandTidslinjeWrapperChange.emit(this.commandTidslinjeWrapper);
  }


  //When choosen a title, send timelines here
  @Input('tidslinjerList') tidslinjerList: Array<tidslinje> = new Array<tidslinje>();
  @Output() tidslinjerListChange: EventEmitter<Array<tidslinje>> = new EventEmitter<Array<tidslinje>>();

  tidslinjerListChangeFun() {
    this.tidslinjerListChange.emit(this.tidslinjerList);
  }

  //When entering website, load all titles.
  @Input('titleList') titleList: Array<String> = new Array<String>();
  @Output() titleListChange: EventEmitter<Array<String>> = new EventEmitter<Array<String>>();

  titleListChangeFun() {
    this.titleListChange.emit(this.titleList);
  }
}
