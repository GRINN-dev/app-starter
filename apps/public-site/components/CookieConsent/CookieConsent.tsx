import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@grinn/components";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import { useCookie } from "react-use";
import { useForm } from "react-hook-form";

export const CookieConsent: FC = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [hasAcceptedCookies, setHasAcceptedCookies] =
    useCookie("hasAcceptedCookies");

  const { register, handleSubmit } = useForm();

  if (!!hasAcceptedCookies) {
    return null;
  }

  return (
    <>
      <Transition.Root show={!hasAcceptedCookies} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={!hasAcceptedCookies}
          onClose={() => {}}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* <Disclosure> */}
              <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="absolute w-20 h-20 -left-20 bottom-10 ">
                  <Image
                    src="/cookies.svg"
                    alt="Cookie icon"
                    layout="fill"
                    className="absolute inset-0 object-contain object-right-bottom opacity-40"
                  />
                  {/* -z-10 */}
                </div>
                <div className="relative">
                  <div className="px-4 pt-5 pb-4 bg-white/50 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Quelques cookies 🍪
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Nous utilisons des cookies pour améliorer la qualité
                            de nos produits et améliorer votre expérience sur
                            notre site.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      type="button"
                      onClick={() => {
                        setHasAcceptedCookies("all");
                        (window as any).gtag("consent", "update", {
                          ad_storage: "granted",
                          analytics_storage: "granted",
                        });
                      }}
                    >
                      Tout accepter
                    </Button>{" "}
                    <Button
                      variant="LINK"
                      onClick={e => {
                        e.preventDefault();
                        setSeeMore(true);
                      }}
                    >
                      En savoir plus
                    </Button>
                    {/*        <Disclosure.Panel>jo</Disclosure.Panel> */}
                  </div>
                </div>{" "}
                {seeMore && (
                  <div className="p-4 mt-3">
                    <p className="text-sm text-gray-500">
                      Nous utilisons des cookies pour améliorer la qualité de
                      nos produits et améliorer votre expérience sur notre site.
                    </p>
                    <form
                      onSubmit={handleSubmit(data => {
                        setHasAcceptedCookies(
                          data.analytics_storage && data.ad_storage
                            ? "all"
                            : data.analytics_storage
                            ? "analytics"
                            : data.ad_storage
                            ? "ads"
                            : "none"
                        );
                        (window as any).gtag("consent", "update", {
                          ad_storage: data.ad_storage ? "granted" : "denied",
                          analytics_storage: data.analytics_storage
                            ? "granted"
                            : "denied",
                        });
                      })}
                    >
                      <fieldset className="space-y-5">
                        <legend className="sr-only">Notifications</legend>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="ad_storage_checkbox"
                              type="checkbox"
                              name="accept"
                              {...register("ad_storage")}
                              className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="ad_storage_checkbox"
                              className="font-medium text-gray-700"
                            >
                              Annonces personnalisées
                            </label>
                            <p
                              id="comments-description"
                              className="text-gray-500"
                            >
                              Ces cookies nous permettent de vous proposer des
                              annonces pertinentes et utiles en fonction des
                              pages que vous visitez sur notre site par exemple.
                            </p>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="analytics_storage_checkbox"
                              type="checkbox"
                              name="accept"
                              aria-describedby="analytics-description"
                              {...register("analytics_storage")}
                              className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="analytics_storage_checkbox"
                              className="font-medium text-gray-700"
                            >
                              Statistiques et Audience
                            </label>
                            <p
                              id="analytics-description"
                              className="text-gray-500"
                            >
                              Afin de comprendre comment les utilisateurs
                              interagissent avec notre site, nous collectons des
                              données d’audience et des actions réalisées.
                            </p>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="functional"
                              aria-describedby="functional-description"
                              name="functional"
                              type="checkbox"
                              checked
                              disabled
                              className="w-4 h-4 text-gray-600 border-gray-300 rounded "
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-700"
                            >
                              Cookies fonctionnels
                            </label>
                            <p
                              id="functional-description"
                              className="text-gray-500"
                            >
                              Nous utilisons aussi des cookies essentiels au bon
                              fonctionnement du site, pour des fonctionnalités
                              de base comme l&apos;authentification ou
                              l&apos;enregistrement de vos preferences
                              concernant les cookies. Ces cookies sont
                              essentiels, vous ne pouvez donc pas les refuser.
                            </p>
                          </div>
                        </div>
                      </fieldset>
                      <div className="flex justify-end m-4">
                        <Button type="submit">Enregistrer mes choix</Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* </Disclosure> */}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
