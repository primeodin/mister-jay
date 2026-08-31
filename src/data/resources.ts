import type { SketchResource } from '../types/sketch';

export const sketchResources: Record<string, SketchResource[]> = {
  'change-tire': [
    {
      id: 'tire-video',
      title: 'How to Change a Flat Tire',
      url: 'https://www.youtube.com/results?search_query=how+to+change+a+flat+tire+safely+AAA',
      type: 'search',
      why: 'Jay would say watch someone do it once before you\'re on the shoulder.',
    },
    {
      id: 'tire-sedan',
      title: 'Sedan jack points',
      url: 'https://www.youtube.com/results?search_query=where+to+place+jack+sedan+frame+point',
      type: 'search',
      why: 'Every car hides its jack point differently — search your year/make/model.',
    },
    {
      id: 'tire-truck',
      title: 'Truck / SUV jack points',
      url: 'https://www.youtube.com/results?search_query=truck+SUV+jack+point+location+frame+rail',
      type: 'search',
      why: 'Trucks and SUVs often use frame rails — don\'t guess.',
    },
  ],
  'replace-battery': [
    {
      id: 'battery-video',
      title: 'Replace a Car Battery Safely',
      url: 'https://www.youtube.com/results?search_query=how+to+replace+car+battery+negative+first+safely',
      type: 'search',
      why: 'Watch the disconnect order — negative first, every time.',
    },
    {
      id: 'battery-corrosion',
      title: 'Clean corroded terminals',
      url: 'https://www.youtube.com/results?search_query=clean+car+battery+corrosion+baking+soda',
      type: 'search',
      why: 'White or green crust means clean before you hook up the new one.',
    },
  ],
  'change-air-filter': [
    {
      id: 'filter-video',
      title: 'Engine Air Filter Replacement',
      url: 'https://www.youtube.com/results?search_query=how+to+change+engine+air+filter+your+car',
      type: 'search',
      why: 'Search your exact year/make/model — the housing clip style varies.',
    },
    {
      id: 'filter-note',
      title: 'Find your housing',
      url: 'https://www.youtube.com/results?search_query=engine+air+filter+location+under+hood',
      type: 'search',
      why: 'Follow the big intake tube from the grille — that\'s where Jay would start.',
    },
  ],
  'check-coolant': [
    {
      id: 'coolant-video',
      title: 'Check Coolant Level Safely',
      url: 'https://www.youtube.com/results?search_query=how+to+check+coolant+overflow+reservoir+cold+engine',
      type: 'search',
      why: 'Cold engine, overflow reservoir — never open a hot radiator cap.',
    },
    {
      id: 'coolant-mix',
      title: 'Correct coolant mix',
      url: 'https://www.youtube.com/results?search_query=what+coolant+to+use+my+car+50+50+mix',
      type: 'search',
      why: 'Wrong coolant type corrodes the system. Check your owner\'s manual.',
    },
  ],
  'read-breaker-panel': [
    {
      id: 'panel-video',
      title: 'How to Read a Breaker Panel',
      url: 'https://www.youtube.com/results?search_query=how+to+read+circuit+breaker+panel+label+breakers',
      type: 'search',
      why: 'Jay labeled every breaker in our house. Yours should be labeled too.',
    },
    {
      id: 'panel-map',
      title: 'Map unlabeled circuits',
      url: 'https://www.youtube.com/results?search_query=how+to+label+circuit+breaker+panel+map',
      type: 'search',
      why: 'Turn one off, see what dies, write it down. One afternoon, years of safety.',
    },
  ],
  'reset-breaker': [
    {
      id: 'reset-video',
      title: 'Reset a Tripped Breaker Safely',
      url: 'https://www.youtube.com/results?search_query=how+to+reset+tripped+circuit+breaker+safely',
      type: 'search',
      why: 'OFF first, then ON. Stand to the side. If it trips again, stop.',
    },
    {
      id: 'overload',
      title: 'Why breakers trip',
      url: 'https://www.youtube.com/results?search_query=circuit+breaker+keeps+tripping+overload+short',
      type: 'search',
      why: 'A breaker that trips twice is telling you something\'s wrong — find it.',
    },
  ],
  'stop-faucet': [
    {
      id: 'faucet-video',
      title: 'Fix a Dripping Faucet',
      url: 'https://www.youtube.com/results?search_query=how+to+fix+dripping+faucet+replace+washer+cartridge',
      type: 'search',
      why: 'Compression vs cartridge — know which you have before you open it.',
    },
    {
      id: 'faucet-shutoff',
      title: 'Find under-sink shutoffs',
      url: 'https://www.youtube.com/results?search_query=under+sink+water+shut+off+valve+location',
      type: 'search',
      why: 'Water off first. Know where the shutoffs are before the drip becomes a flood.',
    },
  ],
  'unclog-sink': [
    {
      id: 'sink-video',
      title: 'Unclog a Sink (P-trap method)',
      url: 'https://www.youtube.com/results?search_query=how+to+unclog+sink+P+trap+remove+clean',
      type: 'search',
      why: 'Bucket under the trap, loosen slip nuts — Jay\'s first move after the plunger.',
    },
    {
      id: 'sink-plunger',
      title: 'Plunger technique',
      url: 'https://www.youtube.com/results?search_query=how+to+plunge+sink+block+overflow+hole',
      type: 'search',
      why: 'Block the overflow hole with a wet rag — doubles your suction.',
    },
  ],
  'move-motorcycle': [
    {
      id: 'moto-video',
      title: 'Walk / Move a Motorcycle Safely',
      url: 'https://www.youtube.com/results?search_query=how+to+walk+move+motorcycle+safely+without+dropping',
      type: 'search',
      why: 'Six hundred pounds wants to fall. Watch how riders use their legs, not their back.',
    },
    {
      id: 'moto-stand',
      title: 'Sidestand vs centerstand',
      url: 'https://www.youtube.com/results?search_query=motorcycle+sidestand+centerstand+how+to+use',
      type: 'search',
      why: 'Know which stand your bike has and how to deploy it on flat ground.',
    },
  ],
  'jump-start': [
    {
      id: 'jump-video',
      title: 'Jump-Start a Car (correct order)',
      url: 'https://www.youtube.com/results?search_query=how+to+jump+start+car+correct+cable+order+safely',
      type: 'search',
      why: 'Red dead, red donor, black donor, black ground. Watch it twice.',
    },
    {
      id: 'jump-hybrid',
      title: 'Hybrid / EV note',
      url: 'https://www.youtube.com/results?search_query=can+you+jump+start+hybrid+electric+car+safely',
      type: 'search',
      why: 'Some hybrids and EVs have special jump points — search your model.',
    },
  ],
};

export function getResourcesForSketch(sketchId: string): SketchResource[] {
  return sketchResources[sketchId] ?? [];
}
