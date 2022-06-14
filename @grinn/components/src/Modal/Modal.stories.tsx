import { Dialog } from "@headlessui/react";
import { Meta, Story } from "@storybook/react";
import { CheckIcon } from "@grinn/icons";
import { useState } from "react";
import { Modal } from "./Modal";

export default {
  title: "Component/Modal",
  component: Modal,
} as Meta;

const Template: Story = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(true)} type="button">
        Open modal
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-accent-900">
            <CheckIcon className="w-6 h-6 text-accent-100" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Success
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur amet labore.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export const ModalExemple = Template.bind({});
