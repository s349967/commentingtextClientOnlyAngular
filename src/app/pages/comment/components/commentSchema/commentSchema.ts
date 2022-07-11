
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { tidslinje } from "../../../../models/tidslinje";
import { tidslinjeCommandWrapper } from "../../../../models/tidslinjeCommandWrapper";
import { title } from "../../../../models/title";

@Component({
  selector: "commentschema",
  templateUrl: "commentSchema.html"
})
export class commentSchemaComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    //TESTING!!
    this.selectStartChangeFun()
  }
  commentSchema: FormGroup;
  constructor(
    private cdref: ChangeDetectorRef, private fb: FormBuilder) {
    this.commentSchema = fb.group({
      user: ["", Validators.required],
      text: ["", Validators.required],
      likedislikeother: ["", Validators.required]
    });
  }
  ngAfterViewInit() {

    Promise.resolve().then(() => this.cdref.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {

    }
  }

  addNewComment() {
    if (this.commentSchema.valid) {
      console.log("Adding new comment")
    }
  }
  //Get change in start and end of selection of text
  @Input('selectStart') selectStart: Number = new Number();

  @Output() selectStartChange: EventEmitter<Number> = new EventEmitter<Number>();

  selectStartChangeFun() {

    this.selectStartChange.emit(this.selectStart);
  }


  @Input('selectEnd') selectEnd: Number = new Number();

  @Output() selectEndChange: EventEmitter<Number> = new EventEmitter<Number>();
  selectEndChangeFun() {
    this.selectEndChange.emit(this.selectEnd);
  }


  //Send selected text between child components
  @Input('selectedText') selectedText: String = new String();
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
  //Current title
  @Input('currentTitle') currentTitle: title = new title();
  @Output() currentTitleChange: EventEmitter<title> = new EventEmitter<title>();

  titleChangeFun() {
    this.currentTitleChange.emit(this.currentTitle);
  }

  //Filtered timelines
  @Input('filteredtimelines') filteredtimelines: Observable<Array<tidslinje>> = new Observable<Array<tidslinje>>();
  @Output() filteredtimelinesChange: EventEmitter<Observable<Array<tidslinje>>> = new EventEmitter<Observable<Array<tidslinje>>>();

  filteredTimelinesChangeFun() {
    this.filteredtimelinesChange.emit(this.filteredtimelines);
  }
}


