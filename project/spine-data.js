const DAYS = [
 { id:'d1', ar:'اليوم 1 — تأهيل وحركة', en:'Day 1 — Mobility & Rehab', groups:[
   {key:'mob', ar:'الحركة اليومية', en:'Daily Mobility', items:[
     {id:'m1',ar:'90/90 Hip Switch',en:'90/90 Hip Switch',type:'reps',target:8,q:'90/90 hip switch mobility exercise'},
     {id:'m2',ar:'Kneeling Hip Flexor Rock',en:'Kneeling Hip Flexor Rock',type:'reps',target:8,q:'Kneeling Hip Flexor Rock mobility'},
     {id:'m3',ar:'Open Book Rotation',en:'Open Book Rotation',type:'reps',target:8,q:'Open Book Rotation thoracic mobility'},
     {id:'m4',ar:'Cat-Cow (مدى صغير)',en:'Cat-Cow (small range)',type:'reps',target:10,q:'Cat Cow stretch proper form'},
     {id:'m5',ar:'Standing Pelvic Tilts',en:'Standing Pelvic Tilts',type:'reps',target:10,q:'Standing Pelvic Tilt exercise'},
     {id:'m6',ar:'Sciatic Nerve Glide',en:'Sciatic Nerve Glide',type:'reps',target:10,q:'Seated Sciatic Nerve Glide'},
     {id:'m7',ar:'Dead Bug (ذراعين فقط)',en:'Dead Bug (arms only)',type:'reps',target:8,q:'Dead Bug exercise proper form'},
   ]},
   {key:'core', ar:'الكور العلاجي', en:'Therapeutic Core', items:[
     {id:'c1',ar:'McGill Curl-Up',en:'McGill Curl-Up',type:'hold',target:5,sets:3,q:'McGill Curl Up exercise'},
     {id:'c2',ar:'Bird Dog',en:'Bird Dog',type:'reps',target:8,sets:3,q:'Bird Dog exercise proper form'},
     {id:'c3',ar:'Side Plank',en:'Side Plank',type:'hold',target:20,sets:2,q:'Side Plank proper form'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s1',ar:'Hamstring Stretch',en:'Hamstring Stretch',type:'hold',target:30,q:'Supine Towel Hamstring Stretch'},
     {id:'s2',ar:'Hip Flexor Stretch',en:'Hip Flexor Stretch',type:'hold',target:30,q:'Half Kneeling Hip Flexor Stretch'},
     {id:'s3',ar:'Piriformis Stretch',en:'Piriformis Stretch',type:'hold',target:30,q:'Supine Figure 4 Piriformis Stretch'},
     {id:'s4',ar:'Calf Stretch',en:'Calf Stretch',type:'hold',target:30,q:'Wall Calf Stretch'},
   ]},
 ]},
 { id:'d2', ar:'اليوم 2 — أعلى الجسم A', en:'Day 2 — Upper Body A', groups:[
   {key:'mob', ar:'إحماء سريع', en:'Quick Warm-up', items:[
     {id:'m1b',ar:'Open Book Rotation',en:'Open Book Rotation',type:'reps',target:8,q:'Open Book Rotation thoracic mobility'},
     {id:'m2b',ar:'Cat-Cow',en:'Cat-Cow',type:'reps',target:10,q:'Cat Cow stretch'},
   ]},
   {key:'gym', ar:'الجيم', en:'Gym', items:[
     {id:'g1',ar:'Incline DB Press',en:'Incline DB Press',type:'reps',target:10,sets:3,q:'Incline Dumbbell Press form'},
     {id:'g2',ar:'Chest-Supported Row',en:'Chest-Supported Row',type:'reps',target:10,sets:3,q:'Chest Supported Row form'},
     {id:'g3',ar:'Seated DB Shoulder Press',en:'Seated DB Shoulder Press',type:'reps',target:10,sets:3,q:'Seated Dumbbell Shoulder Press'},
     {id:'g4',ar:'Lat Pulldown',en:'Lat Pulldown',type:'reps',target:12,sets:3,q:'Lat Pulldown proper form'},
     {id:'g5',ar:'Cable Face Pull',en:'Cable Face Pull',type:'reps',target:15,sets:3,q:'Cable Face Pull form'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s5',ar:'Glute Stretch',en:'Glute Stretch',type:'hold',target:30,q:'Seated Cross Leg Glute Stretch'},
     {id:'s6',ar:'Calf Stretch',en:'Calf Stretch',type:'hold',target:30,q:'Wall Calf Stretch'},
   ]},
 ]},
 { id:'d3', ar:'اليوم 3 — أسفل الجسم A', en:'Day 3 — Lower Body A', groups:[
   {key:'mob', ar:'الحركة', en:'Mobility', items:[
     {id:'m1c',ar:'90/90 Hip Switch',en:'90/90 Hip Switch',type:'reps',target:8,q:'90/90 hip switch mobility'},
     {id:'m6c',ar:'Sciatic Nerve Glide',en:'Sciatic Nerve Glide',type:'reps',target:10,q:'Seated Sciatic Nerve Glide'},
   ]},
   {key:'gym', ar:'الجيم (آمن على العمود)', en:'Gym (Spine-Safe)', items:[
     {id:'g6',ar:'Leg Press',en:'Leg Press',type:'reps',target:12,sets:3,q:'Leg Press proper form'},
     {id:'g7',ar:'Hip Hinge خفيف',en:'Light Hip Hinge',type:'reps',target:10,sets:3,q:'Trap Bar Deadlift form'},
     {id:'g8',ar:'DB Reverse Lunge',en:'DB Reverse Lunge',type:'reps',target:10,sets:3,q:'Dumbbell Reverse Lunge form'},
     {id:'g9',ar:'Cable Pull-Through',en:'Cable Pull-Through',type:'reps',target:12,sets:3,q:'Cable Pull Through form'},
     {id:'g10',ar:'Seated Leg Curl',en:'Seated Leg Curl',type:'reps',target:12,sets:3,q:'Seated Leg Curl form'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s7',ar:'Hamstring Stretch',en:'Hamstring Stretch',type:'hold',target:30,q:'Supine Towel Hamstring Stretch'},
     {id:'s8',ar:'Piriformis Stretch',en:'Piriformis Stretch',type:'hold',target:30,q:'Figure 4 Piriformis Stretch'},
   ]},
 ]},
 { id:'d4', ar:'اليوم 4 — راحة نشطة', en:'Day 4 — Active Rest', groups:[
   {key:'mob', ar:'الحركة اليومية', en:'Daily Mobility', items:[
     {id:'m1d',ar:'90/90 Hip Switch',en:'90/90 Hip Switch',type:'reps',target:8,q:'90/90 hip switch mobility'},
     {id:'m4d',ar:'Cat-Cow',en:'Cat-Cow',type:'reps',target:10,q:'Cat Cow stretch'},
     {id:'m5d',ar:'Pelvic Tilts',en:'Pelvic Tilts',type:'reps',target:10,q:'Standing Pelvic Tilt'},
   ]},
   {key:'cardio', ar:'مشي / كارديو', en:'Walk / Cardio', items:[
     {id:'w1',ar:'مشي هادئ',en:'Easy Walk',type:'hold',target:1200,q:'zone 2 walking pace'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s9',ar:'Hip Flexor Stretch',en:'Hip Flexor Stretch',type:'hold',target:30,q:'Half Kneeling Hip Flexor Stretch'},
     {id:'s10',ar:'Glute Stretch',en:'Glute Stretch',type:'hold',target:30,q:'Seated Cross Leg Glute Stretch'},
   ]},
 ]},
 { id:'d5', ar:'اليوم 5 — أعلى الجسم B', en:'Day 5 — Upper Body B', groups:[
   {key:'gym', ar:'الجيم', en:'Gym', items:[
     {id:'g11',ar:'Flat DB Press',en:'Flat DB Press',type:'reps',target:10,sets:3,q:'Flat Dumbbell Press form'},
     {id:'g12',ar:'Single-Arm DB Row',en:'Single-Arm DB Row',type:'reps',target:10,sets:3,q:'Single Arm Dumbbell Row'},
     {id:'g13',ar:'Machine Shoulder Press',en:'Machine Shoulder Press',type:'reps',target:10,sets:3,q:'Machine Shoulder Press form'},
     {id:'g14',ar:'Assisted Pull-Up',en:'Assisted Pull-Up',type:'reps',target:10,sets:3,q:'Assisted Pull Up machine form'},
     {id:'g15',ar:'Cable Lateral Raise',en:'Cable Lateral Raise',type:'reps',target:15,sets:3,q:'Cable Lateral Raise form'},
   ]},
   {key:'core', ar:'الكور', en:'Core', items:[
     {id:'c4',ar:'Pallof Press',en:'Pallof Press',type:'reps',target:10,sets:3,q:'Pallof Press form'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s11',ar:'Calf Stretch',en:'Calf Stretch',type:'hold',target:30,q:'Wall Calf Stretch'},
   ]},
 ]},
 { id:'d6', ar:'اليوم 6 — أسفل الجسم B', en:'Day 6 — Lower Body B', groups:[
   {key:'gym', ar:'الجيم (آمن على العمود)', en:'Gym (Spine-Safe)', items:[
     {id:'g16',ar:'Goblet Squat',en:'Goblet Squat',type:'reps',target:10,sets:3,q:'Goblet Squat proper form'},
     {id:'g17',ar:'DB Hip Thrust',en:'DB Hip Thrust',type:'reps',target:12,sets:3,q:'Dumbbell Hip Thrust form'},
     {id:'g18',ar:'Walking Lunge',en:'Walking Lunge',type:'reps',target:10,sets:2,q:'Walking Lunge proper form'},
     {id:'g19',ar:'Hip Abduction Machine',en:'Hip Abduction Machine',type:'reps',target:15,sets:3,q:'Hip Abduction Machine form'},
     {id:'g20',ar:'Seated Calf Raise',en:'Seated Calf Raise',type:'reps',target:15,sets:3,q:'Seated Calf Raise form'},
   ]},
   {key:'str', ar:'الإطالة', en:'Stretching', items:[
     {id:'s12',ar:'Hamstring Stretch',en:'Hamstring Stretch',type:'hold',target:30,q:'Supine Towel Hamstring Stretch'},
     {id:'s13',ar:'Piriformis Stretch',en:'Piriformis Stretch',type:'hold',target:30,q:'Figure 4 Piriformis Stretch'},
   ]},
 ]},
 { id:'d7', ar:'اليوم 7 — راحة كاملة', en:'Day 7 — Full Rest', groups:[
   {key:'str', ar:'الإطالة الخفيفة فقط', en:'Light Stretching Only', items:[
     {id:'s14',ar:'Hip Flexor Stretch',en:'Hip Flexor Stretch',type:'hold',target:30,q:'Half Kneeling Hip Flexor Stretch'},
     {id:'s15',ar:'Glute Stretch',en:'Glute Stretch',type:'hold',target:30,q:'Seated Cross Leg Glute Stretch'},
     {id:'s16',ar:'Calf Stretch',en:'Calf Stretch',type:'hold',target:30,q:'Wall Calf Stretch'},
   ]},
 ]},
 { id:'nutrition', ar:'التغذية', en:'Nutrition', icon:'nutrition', groups:[
   {key:'targets', ar:'الهدف اليومي', en:'Daily Targets', items:[
     {id:'n0',ar:'السعرات المستهدفة: 2,500–2,600 سعرة',en:'Target Calories: 2,500–2,600 kcal',type:'info',desc_ar:'BMR ≈ 1,899 سعرة · TDEE ≈ 2,850-2,950 سعرة (نشاط متوسط)',desc_en:'BMR ≈ 1,899 kcal · TDEE ≈ 2,850-2,950 kcal (moderate activity)'},
     {id:'n0b',ar:'الماكروز: بروتين 180ج · كارب 260ج · دهون 75ج',en:'Macros: Protein 180g · Carbs 260g · Fat 75g',type:'info',desc_ar:'= 720 + 1,040 + 675 سعرة تقريبًا · وزّعهم على وجباتك',desc_en:'≈ 720 + 1,040 + 675 kcal · split across your meals'},
   ]},
   {key:'meals', ar:'الوجبات — بالجرامات والسعرات (تشيك ليست)', en:'Meals — Grams & Calories (Checklist)', items:[
     {id:'n1',ar:'فطار — بيض وتورتيلا',en:'Breakfast — Eggs & Tortilla',type:'info',
       desc_ar:'• 3 بيضة كاملة (150ج) — 233 سعرة | ب19.5 · ك1.5 · د16.5<br>• 2 بياض بيض (60ج) — 31 سعرة | ب6.6 · ك0.4 · د0.1<br>• تورتيلا (60ج) — 165 سعرة | ب4.8 · ك27.6 · د3.6<br>• طماطم وخيار (150ج) — 25 سعرة | ب1.2 · ك5 · د0.2<br><strong>الإجمالي: ≈454 سعرة | بروتين 32ج · كارب 35ج · دهون 20ج</strong>',
       desc_en:'• 3 whole eggs (150g) — 233 kcal | P19.5 · C1.5 · F16.5<br>• 2 egg whites (60g) — 31 kcal | P6.6 · C0.4 · F0.1<br>• Tortilla bread (60g) — 165 kcal | P4.8 · C27.6 · F3.6<br>• Tomato & cucumber (150g) — 25 kcal | P1.2 · C5 · F0.2<br><strong>Total: ≈454 kcal | Protein 32g · Carbs 35g · Fat 20g</strong>'},
     {id:'n1alt',ar:'بديل فطار — فول بلدي',en:'Alt Breakfast — Ful Medames',type:'info',
       desc_ar:'• فول مدمس بدون زيت (250ج) — 220 سعرة | ب15 · ك37.5 · د1.5<br>• تورتيلا (60ج) — 165 سعرة | ب4.8 · ك27.6 · د3.6<br><strong>الإجمالي: ≈385 سعرة | بروتين 20ج · كارب 65ج · دهون 5ج</strong>',
       desc_en:'• Ful medames, no oil (250g) — 220 kcal | P15 · C37.5 · F1.5<br>• Tortilla bread (60g) — 165 kcal | P4.8 · C27.6 · F3.6<br><strong>Total: ≈385 kcal | Protein 20g · Carbs 65g · Fat 5g</strong>'},
     {id:'n2',ar:'سناك 1 — واي بروتين وموز',en:'Snack 1 — Whey & Banana',type:'info',
       desc_ar:'• واي بروتين (30ج / سكوب) — 113 سعرة | ب24 · ك2 · د1.5<br>• موزة متوسطة (120ج) — 107 سعرة | ب1.3 · ك27.5 · د0.4<br><strong>الإجمالي: ≈220 سعرة | بروتين 25ج · كارب 30ج · دهون 2ج</strong>',
       desc_en:'• Whey protein (30g / 1 scoop) — 113 kcal | P24 · C2 · F1.5<br>• Medium banana (120g) — 107 kcal | P1.3 · C27.5 · F0.4<br><strong>Total: ≈220 kcal | Protein 25g · Carbs 30g · Fat 2g</strong>'},
     {id:'n3',ar:'غدا — فراخ ورز',en:'Lunch — Chicken & Rice',type:'info',
       desc_ar:'• صدر فراخ مشوي (200ج) — 330 سعرة | ب62 · ك0 · د7<br>• رز أبيض مسلوق (150ج) — 195 سعرة | ب3.6 · ك43 · د0.4<br>• سلاطة خضار (100ج) — 20 سعرة | ب1 · ك4 · د0.2<br><strong>الإجمالي: ≈545 سعرة | بروتين 67ج · كارب 47ج · دهون 8ج</strong>',
       desc_en:'• Grilled chicken breast (200g) — 330 kcal | P62 · C0 · F7<br>• Boiled white rice (150g) — 195 kcal | P3.6 · C43 · F0.4<br>• Vegetable salad (100g) — 20 kcal | P1 · C4 · F0.2<br><strong>Total: ≈545 kcal | Protein 67g · Carbs 47g · Fat 8g</strong>'},
     {id:'n3alt',ar:'بديل غدا — فراخ وبطاطس',en:'Alt Lunch — Chicken & Potato',type:'info',
       desc_ar:'• صدر فراخ مشوي (200ج) — 330 سعرة | ب62 · ك0 · د7<br>• بطاطس مسلوقة (250ج) — 215 سعرة | ب5 · ك50 · د0.3<br>• سلاطة خضار (100ج) — 20 سعرة | ب1 · ك4 · د0.2<br><strong>الإجمالي: ≈565 سعرة | بروتين 68ج · كارب 54ج · دهون 7.5ج</strong>',
       desc_en:'• Grilled chicken breast (200g) — 330 kcal | P62 · C0 · F7<br>• Boiled potato (250g) — 215 kcal | P5 · C50 · F0.3<br>• Vegetable salad (100g) — 20 kcal | P1 · C4 · F0.2<br><strong>Total: ≈565 kcal | Protein 68g · Carbs 54g · Fat 7.5g</strong>'},
     {id:'n4',ar:'سناك 2 — جبنة قريش وتفاح',en:'Snack 2 — Cottage Cheese & Apple',type:'info',
       desc_ar:'• جبنة قريش قليلة الدسم (150ج) — 145 سعرة | ب25 · ك6 · د2<br>• تفاحة متوسطة (150ج) — 78 سعرة | ب0.4 · ك21 · د0.3<br><strong>الإجمالي: ≈223 سعرة | بروتين 25ج · كارب 27ج · دهون 2.3ج</strong>',
       desc_en:'• Low-fat cottage cheese (150g) — 145 kcal | P25 · C6 · F2<br>• Medium apple (150g) — 78 kcal | P0.4 · C21 · F0.3<br><strong>Total: ≈223 kcal | Protein 25g · Carbs 27g · Fat 2.3g</strong>'},
     {id:'n5',ar:'عشا — رومي مفروم ورز',en:'Dinner — Turkey Mince & Rice',type:'info',
       desc_ar:'• رومي مفروم مطهو (180ج) — 290 سعرة | ب50 · ك0 · د9<br>• رز أبيض (150ج) — 195 سعرة | ب3.6 · ك43 · د0.4<br>• خضار مشكل (100ج) — 30 سعرة | ب2 · ك6 · د0.3<br><strong>الإجمالي: ≈515 سعرة | بروتين 56ج · كارب 49ج · دهون 9.7ج</strong>',
       desc_en:'• Cooked turkey mince (180g) — 290 kcal | P50 · C0 · F9<br>• White rice (150g) — 195 kcal | P3.6 · C43 · F0.4<br>• Mixed vegetables (100g) — 30 kcal | P2 · C6 · F0.3<br><strong>Total: ≈515 kcal | Protein 56g · Carbs 49g · Fat 9.7g</strong>'},
     {id:'n5alt',ar:'بديل عشا — بلطي مشوي ورز',en:'Alt Dinner — Grilled Tilapia & Rice',type:'info',
       desc_ar:'• فيليه بلطي/بأسا مشوي (220ج) — 260 سعرة | ب47 · ك0 · د5<br>• رز أبيض (150ج) — 195 سعرة | ب3.6 · ك43 · د0.4<br>• سلاطة خضار (100ج) — 20 سعرة | ب1 · ك4 · د0.2<br><strong>الإجمالي: ≈475 سعرة | بروتين 52ج · كارب 47ج · دهون 5.6ج</strong>',
       desc_en:'• Grilled tilapia/basa fillet (220g) — 260 kcal | P47 · C0 · F5<br>• White rice (150g) — 195 kcal | P3.6 · C43 · F0.4<br>• Vegetable salad (100g) — 20 kcal | P1 · C4 · F0.2<br><strong>Total: ≈475 kcal | Protein 52g · Carbs 47g · Fat 5.6g</strong>'},
   ]},
   {key:'daily-total', ar:'الإجمالي اليومي والتوب أب', en:'Daily Total & Top-Up', items:[
     {id:'ntotal',ar:'إجمالي الوجبات الأساسية (المسار الرئيسي)',en:'Base Meals Total (Main Path)',type:'info',
       desc_ar:'فطار + سناك1 + غدا + سناك2 + عشا ≈ 1,957 سعرة | بروتين 205ج · كارب 188ج · دهون 42ج',
       desc_en:'Breakfast + Snack1 + Lunch + Snack2 + Dinner ≈ 1,957 kcal | Protein 205g · Carbs 188g · Fat 42g'},
     {id:'ntop',ar:'المتبقي للوصول للهدف (2,500-2,600 سعرة)',en:'Remaining to Hit Target (2,500-2,600 kcal)',type:'info',
       desc_ar:'≈550-650 سعرة إضافية — كمّلها بتورتيلا إضافية، فاكهة، أو سكوب واي تاني حسب جوعك ويوم التمرين',
       desc_en:'≈550-650 extra kcal — fill with an extra tortilla, fruit, or another scoop of whey depending on hunger and training day'},
   ]},
   {key:'excl', ar:'ممنوع / مفضّل', en:'Excluded / Preferred', items:[
     {id:'n6',ar:'ممنوع من الأكلات دي',en:'Avoid These Foods',type:'info',desc_ar:'شوفان، جرانولا، عسل، جبنة بيضاء، زيت زيتون — حسب طلبك',desc_en:'Oats, granola, honey, white cheese, olive oil — per your request'},
     {id:'n7',ar:'المفضّل عندك',en:'Your Preferred Foods',type:'info',desc_ar:'تورتيلا، فراخ، بيض، رز، بطاطس، فاكهة، خضار',desc_en:'Tortilla, chicken, eggs, rice, potatoes, fruit, vegetables'},
   ]},
 ]},
 { id:'supplements', ar:'المكملات', en:'Supplements', icon:'supplements', groups:[
   {key:'daily', ar:'الجرعة اليومية (تشيك ليست)', en:'Daily Dose (Checklist)', items:[
     {id:'sup1',ar:'Whey Protein — 25-50 جم',en:'Whey Protein — 25-50g',type:'info',desc_ar:'بعد التمرين أو كسناك · مش بديل عن الأكل الطبيعي',desc_en:'Post-workout or as a snack · not a substitute for whole food'},
     {id:'sup2',ar:'Creatine Monohydrate — 5 جم',en:'Creatine Monohydrate — 5g',type:'info',desc_ar:'أي وقت يوميًا · تأكد من وظائف الكلى مع دكتورك',desc_en:'Any time, daily · confirm kidney function with your doctor'},
     {id:'sup3',ar:'Omega-3 — 1-2 جم',en:'Omega-3 — 1-2g',type:'info',desc_ar:'مع وجبة · ممكن يرقق الدم قليلًا',desc_en:'With a meal · may mildly thin blood'},
     {id:'sup4',ar:'Vitamin D3 — 1000-2000 وحدة',en:'Vitamin D3 — 1000-2000 IU',type:'info',desc_ar:'مع وجبة فيها دهون · اعمل تحليل قبل تحديد الجرعة',desc_en:'With a fat-containing meal · get levels tested first'},
     {id:'sup5',ar:'Magnesium Glycinate — 200-400 ملجم',en:'Magnesium Glycinate — 200-400mg',type:'info',desc_ar:'مساءً · قلل الجرعة لو حصل اضطراب معدة',desc_en:'Evening · reduce dose if GI upset occurs'},
   ]},
 ]},
 { id:'progress', ar:'التقدم', en:'Progress', icon:'chart', groups:[] },
 { id:'coach', ar:'المدرب', en:'Coach', icon:'coach', groups:[] },
];

const ICONS = {
  mob:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.2" r="1.8"/><path d="M12 6.5v5.5M12 12l-4.5 6M12 12l4.5 6M7 9l5 2.5L17 9"/></svg>',
  core:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/></svg>',
  str:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12c2.2-4.2 6.3-6.3 8.5-6.3s6.3 2.1 8.5 6.3M3.5 12c2.2 4.2 6.3 6.3 8.5 6.3s6.3-2.1 8.5-6.3"/></svg>',
  gym:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5M2.2 10.8v2.4M20 9.5v5M21.8 10.8v2.4M7.5 12h9"/><rect x="5.7" y="7.8" width="3" height="8.4" rx="1"/><rect x="15.3" y="7.8" width="3" height="8.4" rx="1"/></svg>',
  cardio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14.3" cy="4.3" r="1.6"/><path d="M10.8 8.2l3.2 2 1.7 4.8M13.8 10l-3 3.2-0.9 4.6M7.3 14.3l3-1 3 1.9"/></svg>',
  nutrition:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2.2v7.3M5 2.2v4.3a2 2 0 004 0V2.2M9 2.2v19.6M16.8 2.2c-2 2.1-2 6.3-2 8.2 0 1.1.9 2 2 2s2-.9 2-2c0-1.9 0-6.1-2-8.2zM16.8 12.5v9.3"/></svg>',
  supplements:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8.3" width="18" height="7.4" rx="3.7" transform="rotate(-45 12 12)"/><line x1="9.2" y1="9.2" x2="14.8" y2="14.8" transform="rotate(-45 12 12)"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.3 11.2L12 3.5l8.7 7.7"/><path d="M5.3 9.8v9.7a1 1 0 001 1h4.2v-6.2h3v6.2h4.2a1 1 0 001-1V9.8"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.2" y="5" width="17.6" height="15.5" rx="2.3"/><path d="M15.8 3v4M8.2 3v4M3.2 10h17.6"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.05.05a2 2 0 11-2.83 2.83l-.05-.05a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.07a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.05.05a2 2 0 11-2.83-2.83l.05-.05A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3.4a2 2 0 010-4h.07A1.65 1.65 0 005 8.98a1.65 1.65 0 00-.33-1.82l-.05-.05A2 2 0 117.45 4.28l.05.05A1.65 1.65 0 009.32 4.66h.02A1.65 1.65 0 0011 3.14V3a2 2 0 014 0v.07a1.65 1.65 0 001.66 1.52 1.65 1.65 0 001.82-.33l.05-.05a2 2 0 112.83 2.83l-.05.05A1.65 1.65 0 0019.4 9c.14.61.53 1.13 1.06 1.42.32.16.68.24 1.04.24H21.6a2 2 0 010 4h-.07a1.65 1.65 0 00-1.55 1.09z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M5 3l16 9-16 9V3z"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c1 3-2 4-2 7a3 3 0 006 0c1.5 1.5 2 3.5 2 5a6 6 0 11-12 0c0-4 3-5 4-9 .5 1 1 1.5 2 1-1-1.5-1-3 0-4z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M9 20V4M14 20v-7M19 20V8"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13M7 11l5 5 5-5M5 21h14"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V8M7 12l5-5 5 5M5 3h14"/></svg>',
  sos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l10 18H2z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/></svg>',
  camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="14" r="3.5"/></svg>',
  speaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 8.5a5 5 0 010 7"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3"/><path d="M12 14v3M9 21h6M8.5 21c0-2 1-3 3.5-3s3.5 1 3.5 3"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z"/></svg>',
  coach:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3.2"/><path d="M3.5 20c.6-3.4 2.8-5.2 5.5-5.2s4.9 1.8 5.5 5.2"/><path d="M15.5 4.5l2.2 1.2v2.6l-2.2 1.2-2.2-1.2V5.7z"/><path d="M17.7 8.3l2.8 2.8M20.5 8.5v2.6h-2.6"/></svg>',
};
const GROUP_ICON = {mob:ICONS.mob, core:ICONS.core, str:ICONS.str, gym:ICONS.gym, cardio:ICONS.cardio};

// ---------- ANIMATED PICTOGRAMS (original stick figures, CSS-animated) ----------
const ANIMS = {
  /* ---- exercise-accurate figures (bold, filled heads, clear ground) ---- */
  hip9090: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-openarm" style="--org:24px 29px;"><circle cx="24" cy="10" r="4.5" fill="currentColor" stroke="none"/><path d="M24 15v12"/><path d="M24 27l-9 4 8 5M24 27l10 3-7 6"/></g><path d="M7 42h34" opacity=".3"/></svg>`,
  hfrock: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-rock"><circle cx="21" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M21 14v12M21 19l7 4M21 26l9-1 3 13M21 26l-7 9h-7"/></g><path d="M5 42h38" opacity=".3"/></svg>`,
  openbook: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="25" r="4.5" fill="currentColor" stroke="none"/><path d="M16 26l15 1M31 27l9 7M16 26l-3 9"/><g class="anim-openarm" style="--org:23px 26px;"><path d="M23 26l10-10"/></g><path d="M5 42h38" opacity=".3"/></svg>`,
  catcow: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-arch"><circle cx="10" cy="18" r="4.5" fill="currentColor" stroke="none"/><path d="M15 21c6-5 13-5 19 0"/><path d="M16 22l-3 14M33 22l3 14"/></g><path d="M6 40h36" opacity=".3"/></svg>`,
  pelvictilt: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="8" r="4.5" fill="currentColor" stroke="none"/><path d="M24 13v8"/><g class="anim-pelvis"><path d="M24 21v7M18 24.5h12"/></g><path d="M24 28l-6 13M24 28l6 13"/><path d="M10 44h28" opacity=".3"/></svg>`,
  nerveglide: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M17 14v13M17 20l8 3M17 27l-2 14"/><g class="anim-extend" style="--org:17px 27px;"><path d="M17 27l14 9"/></g><path d="M6 42h36" opacity=".3"/></svg>`,
  deadbug: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="29" r="4.5" fill="currentColor" stroke="none"/><path d="M14 30h17"/><g class="anim-extend" style="--org:20px 30px;"><path d="M20 30l7-13"/></g><g class="anim-extend" style="--org:31px 30px;"><path d="M31 30l11-8"/></g><path d="M5 38h38" opacity=".3"/></svg>`,
  curlup: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="fb-slow"><g class="fbA"><circle cx="9" cy="30" r="4.5" fill="currentColor" stroke="none"/><path d="M13 31l9 1"/></g><g class="fbB"><circle cx="10" cy="24" r="4.5" fill="currentColor" stroke="none"/><path d="M14 27l8 4"/></g></g><path d="M22 31h9l6-9 5 9"/><path d="M5 39h38" opacity=".3"/></svg>`,
  birddog: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="fb-slow"><g class="fbA"><circle cx="15" cy="17" r="4" fill="currentColor" stroke="none"/><path d="M18 20l13 1M22 21l-2 14M28 21l2 14M18 20l-3 14M31 21l3 14"/></g><g class="fbB"><circle cx="15" cy="17" r="4" fill="currentColor" stroke="none"/><path d="M18 20l13 1M22 21l-2 14M28 21l2 14M18 19L6 17M31 21l12-2"/></g></g><path d="M5 40h38" opacity=".3"/></svg>`,
  sideplank: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-hips"><circle cx="10" cy="15" r="4.5" fill="currentColor" stroke="none"/><path d="M14 18l23 9M37 27l7 3"/></g><path d="M13 19l-2 17M21 22l-3 13"/><path d="M5 40h38" opacity=".3"/></svg>`,
  pallof: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="8" r="4.5" fill="currentColor" stroke="none"/><path d="M16 13v15M16 28l-6 13M16 28l6 13"/><g class="anim-pressout"><path d="M16 18h16M32 14v8"/></g><path d="M5 44h26" opacity=".3"/></svg>`,
  bridge: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><ellipse class="anim-floor anim-floor-sq" cx="24" cy="43" rx="15" ry="2.4" fill="currentColor" stroke="none"/><circle cx="8" cy="31" r="4.5" fill="currentColor" stroke="none"/><g class="fbA"><path d="M12 32h16M28 32l5-8M33 24l4 14"/></g><g class="fbB"><path d="M12 32l16-9M28 23l5 2M33 25l4 13"/></g><path d="M4 43h40" opacity=".3"/></svg>`,
  dbpress: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="fbA"><circle cx="24" cy="14" r="4.5" fill="currentColor" stroke="none"/><path d="M24 19v12M24 31l-7 10M24 31l7 10M24 21l-7-2-1-6M24 21l7-2 1-6M13 11h6M29 11h6"/></g><g class="fbB"><circle cx="24" cy="14" r="4.5" fill="currentColor" stroke="none"/><path d="M24 19v12M24 31l-7 10M24 31l7 10M24 20l-6-6-1-7M24 20l6-6 1-7M13 5h8M27 5h8"/></g></svg>`,
  row: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="10" r="4.5" fill="currentColor" stroke="none"/><path d="M16 14l13 7M29 21l-4 10-4 10M29 21l7 10"/><g class="fbA"><path d="M21 17l1 13M18 30h8"/></g><g class="fbB"><path d="M21 17l6 6M27 23l-2 6M22 29h7"/></g><path d="M5 44h38" opacity=".3"/></svg>`,
  pulldown: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="16" r="4.5" fill="currentColor" stroke="none"/><path d="M24 21v10M24 31l-8 5M24 31l8 5"/><g class="fbA"><path d="M24 21l-8-8-1-7M24 21l8-8 1-7M10 6h9M29 6h9"/></g><g class="fbB"><path d="M24 21l-8-1 1 6M24 21l8-1-1 6M13 26h9M26 26h9"/></g><path d="M8 42h32" opacity=".3"/></svg>`,
  facepull: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="13" r="4.5" fill="currentColor" stroke="none"/><path d="M15 18v13M15 31l-6 11M15 31l6 11"/><g class="anim-pressout"><path d="M15 19h14M29 15l10-3M29 23l10 3"/></g></svg>`,
  legpress: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M38 6v34M38 38h6" opacity=".3"/><path d="M6 34h16l4-6" opacity=".3"/><circle cx="33" cy="16" r="4.5" fill="currentColor" stroke="none"/><path d="M33 20.5v9M30 29.5h8"/><g class="anim-legpress"><path d="M30 29.5l-9-3.5M21 26l-4-9.5"/><rect x="6" y="10" width="3.4" height="14" rx="1.2"/></g></svg>`,
  lunge: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><ellipse class="anim-floor anim-floor-sq" cx="24" cy="44" rx="14" ry="2.4" fill="currentColor" stroke="none"/><g class="fbA"><circle cx="25" cy="7" r="4.5" fill="currentColor" stroke="none"/><path d="M25 12v11M25 15l-6 4M25 15l6 4M25 23l-6 2-1 12M17 25l-2 8M25 23l7 5 1 9"/></g><g class="fbB"><circle cx="23" cy="11" r="4.5" fill="currentColor" stroke="none"/><path d="M23 16v10M23 19l-6 4M23 19l6 4M23 26l-8 1-2 11M15 27l4 6M23 26l9 3 3 8"/></g><path d="M5 43h38" opacity=".3"/></svg>`,
  pullthrough: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="fbA"><circle cx="24" cy="8" r="4.5" fill="currentColor" stroke="none"/><path d="M24 13v13M24 17v9M24 26l-4 16M24 26l5 16"/></g><g class="fbB"><circle cx="10" cy="18" r="4.5" fill="currentColor" stroke="none"/><path d="M14 20l12 6"/><path d="M17 22l0 12"/><path d="M26 26l-3 16M26 26l4 15"/></g><path d="M6 43h36" opacity=".3"/></svg>`,
  legcurl: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="4.5" fill="currentColor" stroke="none"/><path d="M16 17l11 3M27 20l9 1"/><g class="anim-kneecurl" style="--org:36px 21px;"><path d="M36 21l7 10"/></g><path d="M7 40h34" opacity=".3"/></svg>`,
  calfraise: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><ellipse class="anim-floor anim-floor-cr" cx="24" cy="42" rx="10" ry="2.2" fill="currentColor" stroke="none"/><g class="fbA"><circle cx="24" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M24 14v12M24 19l-7 3M24 19l7 3M24 26l-5 12M24 26l5 12M19 38l4 2M29 38l-4 2"/></g><g class="fbB"><circle cx="24" cy="5" r="4.5" fill="currentColor" stroke="none"/><path d="M24 10v12M24 15l-7 3M24 15l7 3M24 22l-5 12M24 22l5 12M19 34l3-1M29 34l-3-1"/></g><path d="M10 43h28" opacity=".3"/></svg>`,
  latraise: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M24 14v14M24 28l-7 12M24 28l7 12"/><g class="fbA"><path d="M24 17l-4 11M24 17l4 11"/></g><g class="fbB"><path d="M24 17l-12 1M24 17l12 1"/></g><path d="M8 44h32" opacity=".3"/></svg>`,
  squat: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><ellipse class="anim-floor anim-floor-sq" cx="24" cy="43" rx="13" ry="2.6" fill="currentColor" stroke="none"/><g class="fbA"><circle cx="24" cy="7" r="4.5" fill="currentColor" stroke="none"/><path d="M24 12v12M24 16l-7 3M24 16l7 3M24 24l-5 9-1 10M24 24l5 9 1 10"/></g><g class="fbB"><circle cx="19" cy="16" r="4.5" fill="currentColor" stroke="none"/><path d="M20 20l5 7"/><path d="M20 20l10-2M20 21l10 2"/><path d="M25 27l9-1"/><path d="M34 26l2 12"/><path d="M25 27l7 4"/><path d="M32 31l3 7"/></g><path d="M6 43h36" opacity=".3"/></svg>`,
  pullup: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h36"/><g class="fbA"><circle cx="24" cy="20" r="4.5" fill="currentColor" stroke="none"/><path d="M24 25v8M24 33l-5 8M24 33l5 8M24 25l-8-9-1-9M24 25l8-9 1-9"/></g><g class="fbB"><circle cx="24" cy="11" r="4.5" fill="currentColor" stroke="none"/><path d="M24 16v9M24 25l-5 8M24 25l5 8M24 16l-8-3 1-6M24 16l8-3-1-6"/></g></svg>`,
  abduction: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="10" r="4.5" fill="currentColor" stroke="none"/><path d="M24 15v12"/><g class="anim-armsout" style="--org:24px 27px;"><path d="M24 27l-11 7M24 27l11 7"/></g><path d="M13 34l-2 8M35 34l2 8" opacity=".7"/><path d="M6 44h36" opacity=".3"/></svg>`,
  hamstretch: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="31" r="4.5" fill="currentColor" stroke="none"/><path d="M13 32h15M28 32l11 3"/><g class="anim-extend" style="--org:22px 32px;"><path d="M22 32l9-17M31 15l-10 7"/></g><path d="M5 40h38" opacity=".3"/></svg>`,
  figure4: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="30" r="4.5" fill="currentColor" stroke="none"/><path d="M13 31h13"/><g class="anim-hips"><path d="M26 31l8-9M34 22l8 5M26 31l10 2"/></g><path d="M5 40h38" opacity=".3"/></svg>`,
  calfstretch: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M42 5v36"/><g class="anim-rock"><circle cx="18" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M18 14l5 10M20 16l16 5M23 24l-10 15M23 24l9 6 5 10"/></g><path d="M4 44h38" opacity=".3"/></svg>`,
  stretch: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-stretch"><circle cx="20" cy="9" r="4.5" fill="currentColor" stroke="none"/><path d="M21 14c1 5 3 9 5 13M21 16l-9 2M22 18l10-3"/></g><path d="M26 27l-8 13M26 27l8 12"/><path d="M8 44h32" opacity=".3"/></svg>`,
  walk: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="fbA"><circle cx="24" cy="8" r="4.5" fill="currentColor" stroke="none"/><path d="M24 13v13M24 17l-8 5M24 17l8-3M24 26l-8 12M24 26l7 6 1 8"/></g><g class="fbB"><circle cx="24" cy="8" r="4.5" fill="currentColor" stroke="none"/><path d="M24 13v13M24 17l8 5M24 17l-8-3M24 26l8 12M24 26l-7 6-1 8"/></g><path d="M5 44h38" opacity=".3"/></svg>`,
  bird: `<svg viewBox="0 0 48 48" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><g class="anim-bob"><circle cx="12" cy="16" r="4.5" fill="currentColor" stroke="none"/><path d="M16 19l17 3M33 22l10-4M16 19l-10-4M20 21l-3 14M30 22l2 14"/></g><path d="M6 42h36" opacity=".3"/></svg>`,

  /* ---- food-accurate icons ---- */
  // fried eggs in a pan
  egg: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><circle cx="21" cy="24" r="12"/><circle cx="18" cy="22" r="4" fill="currentColor" stroke="none" opacity=".4"/><circle cx="28" cy="28" r="3" fill="currentColor" stroke="none" opacity=".3"/></g><path d="M33 24h10" /><g><path class="anim-steam1" d="M16 8v-3"/><path class="anim-steam2" d="M22 7v-3"/></g></svg>`,
  // ful medames: bowl of beans
  ful: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M8 24h32a16 9 0 01-32 0z"/><ellipse cx="17" cy="21" rx="3" ry="2"/><ellipse cx="25" cy="20" rx="3" ry="2"/><ellipse cx="32" cy="22" rx="3" ry="2"/><g><path class="anim-steam1" d="M18 13v-4"/><path class="anim-steam2" d="M25 12v-5"/><path class="anim-steam3" d="M31 13v-4"/></g></svg>`,
  // tortilla: flat round bread with fold
  tortilla: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><circle cx="24" cy="26" r="13"/><path d="M14 22c3-2 7-3 10-3s7 1 10 3" opacity=".5"/><circle cx="19" cy="26" r="1" fill="currentColor" stroke="none" opacity=".4"/><circle cx="27" cy="30" r="1" fill="currentColor" stroke="none" opacity=".4"/><circle cx="29" cy="23" r="1" fill="currentColor" stroke="none" opacity=".4"/></g></svg>`,
  // whey shake: shaker bottle
  shake: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-shake"><path d="M17 14h14l-2 24a3 3 0 01-3 3h-4a3 3 0 01-3-3z"/><path d="M15 10h18M20 6h8"/><path d="M18 22h12" opacity=".5"/></g></svg>`,
  // banana
  banana: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M12 14c1 12 8 20 20 21 3 0 6-1 7-3-13 2-22-7-23-19 0-2-4-1-4 1z"/><path d="M13 12l2-3"/></g></svg>`,
  // chicken drumstick
  chicken: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M28 8a11 11 0 00-14 16l4 4-6 7a3 3 0 104 4l7-6 4 4A11 11 0 1028 8z" transform="scale(.92) translate(2,1)"/><circle cx="12" cy="38" r="2.4"/></g></svg>`,
  // rice bowl: mound of rice
  rice: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M8 27h32a16 9 0 01-32 0z"/><path d="M14 27c0-6 4-10 10-10s10 4 10 10" /><g><path class="anim-steam1" d="M19 12v-4"/><path class="anim-steam2" d="M25 11v-5"/><path class="anim-steam3" d="M30 12v-4"/></g></svg>`,
  // potato
  potato: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><ellipse cx="24" cy="26" rx="14" ry="10" transform="rotate(-12 24 26)"/><circle cx="19" cy="23" r="1" fill="currentColor" stroke="none" opacity=".5"/><circle cx="28" cy="28" r="1" fill="currentColor" stroke="none" opacity=".5"/><circle cx="26" cy="21" r="1" fill="currentColor" stroke="none" opacity=".5"/></g></svg>`,
  // fish
  fish: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M8 24c5-7 12-10 19-10 6 0 11 4 13 10-2 6-7 10-13 10-7 0-14-3-19-10z"/><path d="M40 24l6-6v12z"/><circle cx="15" cy="22" r="1.4" fill="currentColor" stroke="none"/><path d="M24 17v14" opacity=".4"/></g></svg>`,
  // cottage cheese / yogurt cup with spoon
  yogurt: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M14 16h20l-2 22a3 3 0 01-3 3H19a3 3 0 01-3-3z"/><path d="M12 12h24"/><path d="M17 24c2 1.5 4 1.5 6 0s4-1.5 6 0" opacity=".6"/><path d="M34 10l6-5"/></g></svg>`,
  // apple
  apple: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M24 15c-2-3-6-4-9-2-5 3-5 12-1 18 3 5 7 7 10 5 3 2 7 0 10-5 4-6 4-15-1-18-3-2-7-1-9 2z"/><path d="M24 14c0-3 1-5 3-6"/></g></svg>`,
  // turkey/chicken mince bowl
  mince: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M8 26h32a16 9 0 01-32 0z"/><circle cx="16" cy="22" r="2"/><circle cx="23" cy="20" r="2"/><circle cx="30" cy="22" r="2"/><circle cx="26" cy="24" r="2"/><circle cx="19" cy="25" r="2"/><g><path class="anim-steam2" d="M24 12v-5"/></g></svg>`,
  // salad / vegetables
  salad: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M8 27h32a16 9 0 01-32 0z"/><path d="M14 26c1-4 3-7 6-8M24 25c0-5 2-8 5-10M32 26c1-3 3-5 6-6" opacity=".8"/></g></svg>`,
  // generic hot bowl fallback
  bowl: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M9 26h30a15 8 0 01-30 0z"/><path d="M14 26c2-3 6-4 10-4s8 1 10 4"/><g><path class="anim-steam1" d="M18 18v-5"/><path class="anim-steam2" d="M24 17v-6"/><path class="anim-steam3" d="M30 18v-5"/></g></svg>`,
  pill: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M14 30h20M12 36h24a2 2 0 002-2v-3H10v3a2 2 0 002 2z"/><g class="anim-pill"><rect x="20" y="12" width="8" height="12" rx="4"/><path d="M20 18h8"/></g></svg>`,
  // fish-oil capsule
  omega: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><ellipse cx="24" cy="24" rx="14" ry="9" transform="rotate(-25 24 24)"/><path d="M18 27c3-4 8-6 12-6" opacity=".5"/></g></svg>`,
  // sun capsule for D3
  d3: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-pulse"><circle cx="24" cy="24" r="8"/><path d="M24 10v-4M24 42v-4M10 24H6M42 24h-4M13 13l-3-3M38 38l-3-3M13 35l-3 3M38 10l-3 3"/></g></svg>`,
  // moon capsule for magnesium (evening)
  mag: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-bob"><path d="M30 10a13 13 0 108 24 13 13 0 01-8-24z"/><rect x="10" y="28" width="7" height="11" rx="3.5" transform="rotate(-30 13 33)"/></g></svg>`,
  target: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.2" stroke-linecap="round"><g class="anim-pulse"><circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="8"/><circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none"/></g></svg>`,
  macros: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.6" stroke-linecap="round"><g class="anim-pulse"><path d="M24 8a16 16 0 0113.8 8" opacity=".9"/><path d="M40 24a16 16 0 01-16 16" opacity=".6"/><path d="M8 24a16 16 0 018-13.8" opacity=".35"/><circle cx="24" cy="24" r="5"/></g></svg>`,
  ban: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.4" stroke-linecap="round"><g class="anim-pulse"><circle cx="24" cy="24" r="14"/><path d="M14 14l20 20"/></g></svg>`,
  heart: `<svg viewBox="0 0 48 48" fill="none" stroke-width="2.4" stroke-linecap="round"><g class="anim-pulse"><path d="M24 39c-8-6-15-11-15-19a8 8 0 0115-4 8 8 0 0115 4c0 8-7 13-15 19z"/></g></svg>`,
};

function getAnim(it){
  const id = it.id || '';
  const txt = (it.en||'').toLowerCase();

  /* supplements — each its own icon */
  if(id.startsWith('sup')){
    if(txt.includes('whey')) return ANIMS.shake;
    if(txt.includes('omega')) return ANIMS.omega;
    if(txt.includes('d3')||txt.includes('vitamin d')) return ANIMS.d3;
    if(txt.includes('magnesium')) return ANIMS.mag;
    return ANIMS.pill;
  }

  /* nutrition — actual food shapes */
  if(id.startsWith('n')){
    if(txt.includes('calories')) return ANIMS.target;
    if(txt.includes('macros')) return ANIMS.macros;
    if(txt.includes('avoid')) return ANIMS.ban;
    if(txt.includes('preferred')) return ANIMS.heart;
    if(txt.includes('ful')) return ANIMS.ful;
    if(txt.includes('egg')) return ANIMS.egg;
    if(txt.includes('whey')||txt.includes('banana')&&txt.includes('whey')) return ANIMS.shake;
    if(txt.includes('tilapia')||txt.includes('fish')||txt.includes('basa')) return ANIMS.fish;
    if(txt.includes('mince')||txt.includes('turkey')) return ANIMS.mince;
    if(txt.includes('potato')) return ANIMS.potato;
    if(txt.includes('cottage')||txt.includes('yogurt')) return ANIMS.yogurt;
    if(txt.includes('apple')) return ANIMS.apple;
    if(txt.includes('banana')) return ANIMS.banana;
    if(txt.includes('chicken')&&txt.includes('rice')) return ANIMS.rice;
    if(txt.includes('chicken')) return ANIMS.chicken;
    if(txt.includes('rice')) return ANIMS.rice;
    if(txt.includes('tortilla')) return ANIMS.tortilla;
    if(txt.includes('total')||txt.includes('remaining')) return ANIMS.target;
    return ANIMS.bowl;
  }

  /* exercises — exact movement per name */
  if(txt.includes('90/90')) return ANIMS.hip9090;
  if(txt.includes('hip flexor rock')) return ANIMS.hfrock;
  if(txt.includes('hip flexor stretch')) return ANIMS.hfrock;
  if(txt.includes('open book')) return ANIMS.openbook;
  if(txt.includes('cat-cow')||txt.includes('cat cow')) return ANIMS.catcow;
  if(txt.includes('pelvic tilt')) return ANIMS.pelvictilt;
  if(txt.includes('nerve')||txt.includes('glide')) return ANIMS.nerveglide;
  if(txt.includes('dead bug')) return ANIMS.deadbug;
  if(txt.includes('curl-up')||txt.includes('curl up')) return ANIMS.curlup;
  if(txt.includes('bird dog')) return ANIMS.birddog;
  if(txt.includes('side plank')) return ANIMS.sideplank;
  if(txt.includes('pallof')) return ANIMS.pallof;
  if(txt.includes('bridge')||txt.includes('hip thrust')) return ANIMS.bridge;
  if(txt.includes('pulldown')) return ANIMS.pulldown;
  if(txt.includes('pull-up')||txt.includes('pull up')) return ANIMS.pullup;
  if(txt.includes('face pull')) return ANIMS.facepull;
  if(txt.includes('pull-through')||txt.includes('pull through')) return ANIMS.pullthrough;
  if(txt.includes('hinge')||txt.includes('deadlift')) return ANIMS.pullthrough;
  if(txt.includes('leg press')) return ANIMS.legpress;
  if(txt.includes('leg curl')) return ANIMS.legcurl;
  if(txt.includes('calf raise')) return ANIMS.calfraise;
  if(txt.includes('calf stretch')||txt.includes('wall calf')||(txt.includes('calf')&&txt.includes('stretch'))) return ANIMS.calfstretch;
  if(txt.includes('lateral raise')) return ANIMS.latraise;
  if(txt.includes('abduction')) return ANIMS.abduction;
  if(txt.includes('lunge')) return ANIMS.lunge;
  if(txt.includes('squat')) return ANIMS.squat;
  if(txt.includes('row')) return ANIMS.row;
  if(txt.includes('press')) return ANIMS.dbpress;
  if(txt.includes('hamstring')) return ANIMS.hamstretch;
  if(txt.includes('figure') || txt.includes('piriformis')) return ANIMS.figure4;
  if(txt.includes('glute stretch')||txt.includes('cross leg')||txt.includes('cross-leg')) return ANIMS.figure4;
  if(txt.includes('walk')||txt.includes('cardio')) return ANIMS.walk;
  if(txt.includes('calf')) return ANIMS.calfraise;
  if(txt.includes('curl')) return ANIMS.dbpress;
  if(txt.includes('stretch')) return ANIMS.stretch;
  return ANIMS.bird;
}


window.SpineData = { DAYS, ICONS, GROUP_ICON, ANIMS, getAnim };
