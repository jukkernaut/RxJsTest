import * as Rx from "rxjs";
import { Observable, Subject, pipe, of, filter, map } from "rxjs";
import { isTemplateHead, skipPartiallyEmittedExpressions } from "typescript";
import * as Log from "./logger";
import { addItem } from "./logger";
import { share, mergeWith, max, count } from "rxjs/operators";
//import "rxjs/add/operator/share";
///<reference path="./logger.ts" />;

import { fromEvent, BehaviorSubject } from "rxjs";
import { observeNotification } from "rxjs/internal/Notification";
import { Template } from "webpack";

// misc tests: **********************

//const a = <int>2;
//<div></div>
//addItem(<div></div>);
// ***** operators *************************

var observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  //observer.complete();
}).pipe(filter((data: number) => data > 0));

observable
  .pipe(
    filter((data) => data > 0),
    map((data) => {
      return data * 10;
    })
  )
  .subscribe({
    next: (valu: any) => {
      Log.addItem(valu);
    },
  });

of(5, 4, 7, 2, 8)
  .pipe(max())
  .subscribe((x) => Log.addItem(x));

of({ age: 7, name: "Foo" }, { age: 5, name: "Bar" }, { age: 9, name: "Beer" })
  .pipe(max((a, b) => (a.age < b.age ? -1 : 1)))
  .subscribe((x) => Log.addItem("maxi: " + x.name));

//var newObservable = mergeWith(observable, observable2);

//var newObs = observable.pipe(mergeWith(observable, observable2));

//newObs = newObs.pipe(Rx.max());
// newObs.pipe(max()).subscribe((val) => {
//   Log.addItem(val);
// });

//observable.pipe(Rx.skip(2));

//********* Async subject */

// var repaSubject = new Rx.AsyncSubject();

// var i = 1;
// var int = setInterval(() => repaSubject.next("emit no: " + i++), 100);

// setTimeout(() => {
//   var obs = repaSubject.subscribe({
//     next: (data) => {
//       Log.addItem("obs1: " + data);
//     },
//     error: (erro) => {
//       Log.addItem("error: " + erro);
//     },
//     complete: () => {
//       Log.addItem("obs1 is complete!");
//     },
//   });
//   repaSubject.complete();
// }, 100);

//************** replay subject */

// var repaSubject = new Rx.ReplaySubject(1, 10);

// var i = 1;
// var int = setInterval(() => repaSubject.next("emit no: " + i++), 100);

// setTimeout(() => {
//   var obs = repaSubject.subscribe({
//     next: (data) => {
//       Log.addItem("obs1: " + data);
//     },
//     error: (erro) => {
//       Log.addItem("error: " + erro);
//     },
//     complete: () => {
//       Log.addItem("obs1 is complete!");
//     },
//   });
// }, 1000);

// setTimeout(() => {
//   repaSubject.complete();
// }, 5000);

//***********   behaviour subject*/ //
// var behaSubj = new BehaviorSubject("Intial");
// behaSubj.next("First 1");

// var obs = behaSubj.subscribe({
//   next: (data) => {
//     Log.addItem("obs1: " + data);
//   },
//   error: (erro) => {
//     Log.addItem("error: " + erro);
//   },
//   complete: () => {
//     Log.addItem("obs1  complete!");
//   },
// });

// behaSubj.next("First2 emit!");
// behaSubj.next("behaSubbi 2 is about to subscibe!");

// var obs2 = behaSubj.subscribe({
//   next: (data) => {
//     Log.addItem("obs2 : " + data);
//   },
//   error: (e) => {
//     Log.addItem("horror obs2");
//   },
//   complete: () => {
//     Log.addItem("observer 2 complete");
//   },
// });

// behaSubj.next("Third emit");

// obs.unsubscribe();
// behaSubj.next("fourth emit");
// obs2.unsubscribe();
// behaSubj.next("turha lähetys kun ei kuuntelijoita");

// *************** Subjects ****************************************************

// var subject = new Subject();

// subject.next("helekuta 0");

// var obs = subject.subscribe({
//   next: (data) => Log.addItem("Observer1:" + data),
//   error: (erro) => Log.addItem(erro),
//   complete: () => Log.addItem("obs1 complete"),
// });

// subject.next("voi helevata 1");

// var obs2 = subject.subscribe({
//   next: (data) => Log.addItem("Observer2:" + data),
//   error: (erro) => Log.addItem(erro),
//   complete: () => Log.addItem("obs2 complete"),
// });

// subject.next("voi helevata 2");

// obs2.unsubscribe();

// //subject.complete();

// subject.next("the final helevata sent");

// *********** hot observable - data prduced outside observable ****************

// var observable = fromEvent(document, "mousemove");

// setTimeout(() => {
//   var subcription = observable.subscribe({
//     next: (v) => {
//       Log.addItem(v);
//     },
//     error: (e) => {
//       Log.addItem(e);
//     },
//   });
// }, 2000);
//************************ Warm observable *******************************************

// var nextId = 0;

// function getNextId() {
//   return ", Next MsgNo " + ++nextId;
// }

// var observable = new Observable((observer: any) => {
//   try {
//     observer.next("Hey guys!" + getNextId());
//     observer.next("how are you?" + getNextId());
//     setInterval(() => {
//       observer.next("Im good!" + getNextId());
//     }, 1000);
//     // setTimeout(() => {
//     //   observer.complete();
//     // }, 4000);
//   } catch (err) {
//     observer.error(err);
//   }
// }).pipe(share());  // share makes observable warm

// var observer = observable.subscribe({
//   next: (v) => Log.addItem("subscriber 1" + v),
//   error: (e) => Log.addItem("Horrori: " + e),
//   complete: () => Log.addItem("complete"),
// });

// setTimeout(() => {
//   var observer2 = observable.subscribe({
//     next: (v) => {
//       Log.addItem("subscriber 2 : " + v);
//     },
//   });
// }, 2000);

// ******************** First observable tests **************************************

// var observable = new Rx.Observable((observer: any) => {
//   try {
//     observer.next("Heya!");
//     observer.next("how are you?");
//     setInterval(() => {
//       observer.next("all say hell yeah!");
//     }, 1000);
//     // setTimeout(() => {
//     //   observer.complete();
//     // }, 4000);
//   } catch (err) {
//     observer.error(err);
//   }
// });

// var observer = observable.subscribe({
//   next: (v) => Log.addItem("obs1" + v),
//   error: (e) => Log.addItem("Horrori: " + e),
//   complete: () => Log.addItem("complete"),
// });

// var observer2 = observable.subscribe({
//   next: (v) => Log.addItem("obs2" + v),
//   error: (e) => Log.addItem("Horrori: " + e),
//   complete: () => Log.addItem("complete"),
// });

// observer.add(observer2);

// setTimeout(() => {
//   observer.unsubscribe();
//   Log.addItem("obs1 unsubscibed");
// }, 3000);

// setTimeout(() => {
//   observer2.unsubscribe();
//   Log.addItem("obs2 unsubscibed");
// }, 6000);
