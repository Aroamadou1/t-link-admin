import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivraisonsPage } from './livraisons.page';

describe('LivraisonsPage', () => {
  let component: LivraisonsPage;
  let fixture: ComponentFixture<LivraisonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivraisonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
