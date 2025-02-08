export const CLASS_FILLING_PROMPT = (
  businessDescription: string,
) => `Figure out what class these marks should be filed under based on the business description/activity enclosed in <businessDescription> tags. The available class are listed below under the <class> tag. Also recommend additional class that may be relevant in <additionalProtection> tags and provide proper rationale in the <additionalProtectionRationale> tags.

<businessDescription>
${businessDescription}
</businessDescription>

<class>Class 1 Chemicals for use in industry, science and photography, as well as in agriculture,horticulture and forestry; unprocessed artificial resins, unprocessed plastics; fire extinguishing and fire prevention compositions; tempering and soldering preparations; substances for tanning animal skins and hides; adhesives for use in industry; putties and other paste fillers; compost, manures, fertilizers; biological preparations for use in industry and scienceClass 2 Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants, dyes; inks for printing, marking and engraving; raw natural resins; metals in foil and powder form for use in painting, decorating, printing and artClass 3 Non-medicated cosmetics and toiletry preparations; non-medicated dentifrices; perfumery, essential oils; bleaching preparations and other substances for laundry use; cleaning, polishing, scouring and abrasive preparationsClass 4 Industrial oils and greases, wax; lubricants; dust absorbing, wetting and binding compositions; fuels and illuminants; candles and wicks for lightingClass 5 Pharmaceuticals, medical and veterinary preparations; sanitary preparations for medical purposes; dietetic food and substances adapted for medical or veterinary use, food for babies; dietary supplements for human beings and animals; plasters,materials for dressings; material for stopping teeth, dental wax; disinfectants; preparations for destroying vermin; fungicides, herbicidesClass 6 Common metals and their alloys, ores; metal materials for building and construction; transportable buildings of metal; non-electric cables and wires of common metal; small items of metal hardware; metal containers for storage or transport; safesClass 7 Machines, machine tools, power-operated tools; motors and engines, except for land vehicles; machine coupling and transmission components, except for land vehicles; agricultural implements, other than hand-operated hand tools; incubators for eggs; automatic vending machinesClass 8 Hand tools and implements, hand-operated; cutlery; side arms, except firearms;razorsClass 9 Scientific, research, navigation, surveying, photographic, cinematographic,audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting,life-saving and teaching apparatus and instruments; apparatus and instruments for conducting, switching, transforming, accumulating, regulating or controlling the distribution or use of electricity; apparatus and instruments for recording,transmitting, reproducing or processing sound, images or data; recorded and downloadable media, computer software, blank digital or analogue recording and storage media; mechanisms for coin-operated apparatus; cash registers, calculating devices; computers and computer peripheral devices; diving suits, divers’ masks,ear plugs for divers, nose clips for divers and swimmers, gloves for divers,breathing apparatus for underwater swimming; fire-extinguishing apparatusClass 10 Surgical, medical, dental and veterinary apparatus and instruments; artificial limbs,eyes and teeth; orthopaedic articles; suture materials; therapeutic and assistive devices adapted for persons with disabilities; massage apparatus; apparatus,devices and articles for nursing infants; sexual activity apparatus, devices and articlesClass 11 Apparatus and installations for lighting, heating, cooling, steam generating, cooking,drying, ventilating, water supply and sanitary purposesClass 12 Vehicles; apparatus for locomotion by land, air or waterClass 13 Firearms; ammunition and projectiles; explosives; fireworksClass 14 Precious metals and their alloys; jewellery, precious and semi-precious stones;horological and chronometric instrumentsClass 15 Musical instruments; music stands and stands for musical instruments; conductors’ batonsClass 16 Paper and cardboard; printed matter; bookbinding material; photographs; stationeryand office requisites, except furniture; adhesives for stationery or householdpurposes; drawing materials and materials for artists; paintbrushes; instructionaland teaching materials; plastic sheets, films and bags for wrapping and packaging;printers’ type, printing blocksClass 17 Unprocessed and semi-processed rubber, gutta-per cha, gum, asbestos, mica andsubstitutes for all these materials; plastics and resins in extruded form for use in manufacture; packing, stopping and insulating materials; flexible pipes, tubes andhoses, not of metalClass 18 Leather and imitations of leather; animal skins and hides; luggage and carryingbags; umbrellas and parasols; walking sticks; whips, harness and saddlery; collars,leashes and clothing for animalsClass 19 Materials, not of metal, for building and construction; rigid pipes, not of metal, forbuilding; asphalt, pitch, tar and bitumen; transportable buildings, not of metal;monuments, not of metalClass 20 Furniture, mirrors, picture frames; containers, not of metal, for storage or transport;unworked or semi-worked bone, horn, whalebone or mother-of-pearl; shells;meerschaum; yellow amberClass 21 Household or kitchen utensils and containers; cookware and tableware, exceptforks, knives and spoons; combs and sponges; brushes, except paintbrushes;brush-making materials; articles for cleaning purposes; unworked or semi-workedglass, except building glass; glassware, porcelain and earthenwareClass 22 Ropes and string; nets; tents and tarpaulins; awnings of textile or syntheticmaterials; sails; sacks for the transport and storage of materials in bulk; padding,cushioning and stuffing materials, except of paper, cardboard, rubber or plastics;raw fibrous textile materials and substitutes thereforClass 23 Yarns and threads for textile useClass 24 Textiles and substitutes for textiles; household linen; curtains of textile or plasticClass 25 Clothing, footwear, headwearClass 26 Lace, braid and embroidery, and haberdashery ribbons and bows; buttons, hooksand eyes, pins and needles; artificial flowers; hair decorations; false hairClass 27 Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings, not of textileClass 28 Games, toys and playthings; video game apparatus; gymnastic and sportingarticles; decorations for Christmas treesClass 29 Meat, fish, poultry and game; meat extracts; preserved, frozen, dried and cookedfruits and vegetables; jellies, jams, compotes; eggs; milk, cheese, butter, yogurt andother milk products; oils and fats for foodClass 30 Coffee, tea, cocoa and artificial coffee; rice, pasta and noodles; tapioca and sago;flour and preparations made from cereals; bread, pastries and confectionery;chocolate; ice cream, sorbets and other edible ices; sugar, honey, treacle; yeast,baking-powder; salt, seasonings, spices, preserved herbs; vinegar, sauces andother condiments; ice (frozen water)Class 31 Raw and unprocessed agricultural, aquacultural, horticultural and forestry products;raw and unprocessed grains and seeds; fresh fruits and vegetables, fresh herbs;natural plants and flowers; bulbs, seedlings and seeds for planting; live animals;foodstuffs and beverages for animals; maltClass 32 Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages andfruit juices; syrups and other non-alcoholic preparations for making beveragesClass 33 Alcoholic beverages, except beers; alcoholic preparations for making beveragesClass 34 Tobacco and tobacco substitutes; cigarettes and cigars; electronic cigarettes andoral vaporizers for smokers; smokers’ articles; matchesClass 35 Advertising; business management; business administration; office functionsClass 36 Insurance; financial affairs; monetary affairs; real estate affairsClass 37 Construction services; installation and repair services; mining extraction, oil and gasdrillingClass 38 Telecommunications servicesClass 39 Transport; packaging and storage of goods; travel arrangementClass 40 Treatment of materials; recycling of waste and trash; air purification and treatmentof water; printing services; food and drink preservationClass 41 Education; providing of training; entertainment; sporting and cultural activitiesClass 42 Scientific and technological services and research and design relating thereto;industrial analysis, industrial research and industrial design services; quality controland authentication services; design and development of computer hardware and softwareClass 43 Services for providing food and drink; temporary accommodationClass 44 Medical services; veterinary services; hygienic and beauty care for human beings oranimals; agriculture, aquaculture, horticulture and forestry servicesClass 45 Legal services; security services for the physical protection of tangible property andindividuals; personal and social services rendered by others to meet the needs ofindividuals</class> 
</class>`;

export const FEE_QUOTE_PROMPT = (
  numberOfClasses: number,
  numberOfMarks: number,
  priorityClaim: boolean,
  feeInfo: {
    amountInCents: number;
    currency: string;
    description: string;
    footnotes: string;
  }[],
) => `Please provide a detailed fee quote breakdown for ${numberOfMarks} trademark application(s) in ${numberOfClasses} class(es) in Singapore${priorityClaim ? " with priority claim" : ""}, with the fee info in <fee> tags based on the following structure:

1. Break down the fees into:
   - Professional fees for filing (1st class and additional classes)
   - Official fees for filing (1st class and additional classes)
   - Professional fees for priority claim (if applicable)
   - Professional fees for processing acceptance (1st class and additional classes)

2. Calculate and show:
   - Total fees per mark
   - Grand total for all marks

3. Include relevant footnotes about:
   - Pre-approved specifications fee reduction
   - Priority claim specifications requirements
   - Additional costs for office actions/oppositions

Use the fee information provided to ensure accurate calculations and maintain the same format as shown in the example in <example> tags.


${feeInfo
  .map(
    (fee) => `<fee>
<feeAmountCents>${fee.amountInCents}</feeAmountCents>
<feeCurrency>${fee.currency}</feeCurrency>
<feeDescription>${fee.description}</feeDescription>
<feeFootnotes>${fee.footnotes}</feeFootnotes>
</fee>`,
  )
  .join("\n")}

<example>
We are pleased to provide our estimated fee quote to file a straightforward trade mark application in Singapore (assuming no office action and no third party opposition), excluding miscellaneous disbursements:

Preparing and filing a trade mark application - 1st class:
- Professional fees: SGD 630
- Official fees^1: SGD 380

Each additional class:
- Professional fees: SGD 420  
- Official fees^1: SGD 380

Claiming priority (identical specifications)^2:
- Professional fees: SGD 110

Processing official acceptance, publication and registration (assuming no opposition):
1st class:
- Professional fees: SGD 420

Each additional class:
- Professional fees: SGD 210

Total estimated fees for 1 mark in 2 classes:
SGD 2,440 (without priority claim)

^1: Where all items in the specification accords with the Registry's pre-approved list of goods/services, the filing fee will be reduced to SGD 280 per class instead of the standard SGD 380 per class.

^2: Please let us know if the items of specifications of the application are not identical to the priority application.

In the event that any office action is issued by the Registry following substantive examination, or in case of opposition by a third party following publication, additional costs will apply depending on the complexity of the case.
</example>`;

export const GOODS_AND_SERVICES_CHECK_PROMPT = (
  businessDescription: string,
) => `Based on the business description enclosed in <businessDescription> tags, suggest a list of pre-approved goods and services for the classes enclosed in <pre-approved> tags. If the goods and services are not within the pre-approved list, please suggest a list of goods and services that are appropriate for the business description indicate that they are not within the pre-approved list.

<businessDescription>
${businessDescription}
</businessDescription>

<pre-approved>
Roast beef
Roast beef extract
Roast chestnuts
Roast nuts
Roasted almonds
Roasted cashew nuts
Roasted chestnuts
Roasted chicken
Roasted macadamia nuts
Roasted meat
Roasted mixed nuts
Roasted nuts
Roasted peanuts
Roasted pecans
Roasted pork
Roasted suckling pig meat
</pre-approved>`;
