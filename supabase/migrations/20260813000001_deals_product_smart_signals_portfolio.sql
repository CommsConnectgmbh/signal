-- Smart Signals ist ab 2026-08-13 die Produktmarke fuer die eigenen Software-
-- Produkte. Die Pipeline im Partner-Portal muss diese Produkte fuehren koennen.
--
-- Die drei alten Telko-Werte ('5g-koffer', 'company-phone', 'mobilfunk')
-- bleiben ERLAUBT, damit bestehende Zeilen unveraendert gueltig bleiben und
-- keine Historie verlorengeht. Neue Deals werden ueber die UI nur noch mit den
-- neuen Slugs angelegt.
alter table public.deals drop constraint if exists deals_product_check;

alter table public.deals
  add constraint deals_product_check check (
    product = any (array[
      -- Smart-Signals-Portfolio
      'belegify'::text,
      'obacht'::text,
      'obacht-talents'::text,
      'conduit'::text,
      'simvi'::text,
      'swing-and-savor'::text,
      'dealbuddy'::text,
      'mitarbeitervorteile'::text,
      'sonstiges'::text,
      -- Bestand aus der Telko-Phase, nur noch lesend
      '5g-koffer'::text,
      'company-phone'::text,
      'mobilfunk'::text
    ])
  );
