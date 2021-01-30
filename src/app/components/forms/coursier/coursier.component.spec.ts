import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursierComponent } from './coursier.component';

describe('CoursierComponent', () => {
  let component: CoursierComponent;
  let fixture: ComponentFixture<CoursierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursierComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
