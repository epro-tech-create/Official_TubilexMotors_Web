"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CarFront,
  MessageSquare,
  CheckCircle2,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { Brand } from "./brand";
import type { Vehicle, Enquiry } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import {
  saveVehicle,
  deleteVehicle,
  updateEnquiry,
  uploadVehicleImage,
} from "@/app/admin/actions";
const blank = {
  name: "",
  slug: "",
  category: "SUV",
  description: "",
  image: "/media/mercedes.webp",
  price: null,
  year: null,
  mileage: null,
  fuel: "Not specified",
  transmission: "Not specified",
  status: "available",
  featured: false,
};
export function AdminDashboard({
  name,
  vehicles,
  enquiries,
}: {
  name: string;
  vehicles: Vehicle[];
  enquiries: Enquiry[];
}) {
  const [tab, setTab] = useState("vehicles");
  const [editing, setEditing] = useState<Vehicle | "new" | null>(null);
  const [deleting, setDeleting] = useState<Vehicle | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  async function signOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  function remove() {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deleteVehicle(deleting.id);
      if (result.error) setError(result.error);
      else {
        setDeleting(null);
        setMessage("Vehicle deleted.");
        router.refresh();
      }
    });
  }
  return (
    <div className="admin-shell">
      <nav className="admin-nav" aria-label="Workspace navigation">
        <Brand light />
        <div className="admin-nav-right">
          <Link href="/">
            View showroom <ArrowUpRight size={14} />
          </Link>
          <span>{name}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
      </nav>
      <main id="main" className="admin-main">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">TUBILEX WORKSPACE</span>
            <h1>Keep things moving.</h1>
            <p>Your collection and customer conversations, in one place.</p>
          </div>
          <button
            className="button"
            onClick={() => {
              setError("");
              setMessage("");
              setEditing("new");
            }}
          >
            <Plus size={17} /> Add vehicle
          </button>
        </div>
        <div className="admin-stats">
          {[
            {
              label: "Vehicles in collection",
              value: vehicles.length,
              icon: CarFront,
            },
            {
              label: "Available vehicles",
              value: vehicles.filter((v) => v.status === "available").length,
              icon: CheckCircle2,
            },
            {
              label: "New enquiries",
              value: enquiries.filter((e) => e.status === "new").length,
              icon: MessageSquare,
            },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div>
                <span>{s.label}</span>
                <strong>{String(s.value).padStart(2, "0")}</strong>
              </div>
              <s.icon />
            </div>
          ))}
        </div>
        {message && (
          <p className="admin-message" role="status">
            {message}
          </p>
        )}
        {error && (
          <p className="admin-message error" role="alert">
            {error}
          </p>
        )}
        <div className="admin-tabs">
          <button
            className={tab === "vehicles" ? "active" : ""}
            onClick={() => setTab("vehicles")}
          >
            Vehicle collection ({vehicles.length})
          </button>
          <button
            className={tab === "enquiries" ? "active" : ""}
            onClick={() => setTab("enquiries")}
          >
            Enquiries ({enquiries.length})
          </button>
        </div>
        {deleting && (
          <div className="delete-confirm" role="alert">
            <span>
              Delete <strong>{deleting.name}</strong>? This removes the listing.
              Existing enquiries are retained.
            </span>
            <div>
              <button onClick={() => setDeleting(null)} disabled={pending}>
                Cancel
              </button>
              <button onClick={remove} disabled={pending}>
                {pending ? "Deleting…" : "Delete vehicle"}
              </button>
            </div>
          </div>
        )}
        {tab === "vehicles" ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="admin-vehicle-cell">
                        <Image
                          src={v.image}
                          alt=""
                          width={55}
                          height={43}
                          unoptimized
                        />
                        <div>
                          <Link href={`/vehicles/${v.slug}`}>{v.name}</Link>
                          <small>
                            {v.featured ? "Featured · " : ""}
                            {v.year || "Year not set"}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>{v.category}</td>
                    <td>
                      {v.price === null
                        ? "On request"
                        : `TZS ${Number(v.price).toLocaleString()}`}
                    </td>
                    <td>
                      <span className={`badge ${v.status}`}>{v.status}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          onClick={() => {
                            setError("");
                            setEditing(v);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="danger"
                          onClick={() => {
                            setError("");
                            setDeleting(v);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!vehicles.length && (
                  <tr>
                    <td colSpan={5}>
                      No vehicles yet. Add your first vehicle above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="enquiry-list">
            {enquiries.map((e) => (
              <article key={e.id} className="enquiry-card">
                <div className="enquiry-card-top">
                  <div>
                    <h3>{e.name}</h3>
                    <a href={`mailto:${e.email}`}>{e.email}</a>
                  </div>
                  <select
                    aria-label={`Status for enquiry from ${e.name}`}
                    value={e.status}
                    disabled={pending}
                    onChange={(event) => {
                      const status = event.target.value;
                      startTransition(async () => {
                        const result = await updateEnquiry(e.id, status);
                        if (result.error) setError(result.error);
                        else router.refresh();
                      });
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <p>{e.message}</p>
                <div className="enquiry-meta">
                  <span>
                    {new Date(e.created_at).toLocaleString("en-GB", {
                      timeZone: "Africa/Dar_es_Salaam",
                    })}{" "}
                    EAT
                  </span>
                  {e.phone && (
                    <a href={`tel:${e.phone.replace(/[^+\d]/g, "")}`}>
                      {e.phone}
                    </a>
                  )}
                  {e.vehicle_id && (
                    <span>
                      Vehicle:{" "}
                      {vehicles.find((v) => v.id === e.vehicle_id)?.name ||
                        `#${e.vehicle_id}`}
                    </span>
                  )}
                </div>
              </article>
            ))}
            {!enquiries.length && (
              <div className="empty-state">
                <MessageSquare />
                <h3>Room for a conversation.</h3>
                <p>
                  Customer enquiries will appear here when someone gets in
                  touch.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      {editing && (
        <VehicleEditor
          vehicle={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            setMessage("Vehicle saved. Your showroom is up to date.");
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
function VehicleEditor({
  vehicle,
  onClose,
  onSaved,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const data = vehicle || blank;
  const [imageUrl, setImageUrl] = useState(data.image);
  const [uploading, setUploading] = useState(false);
  async function upload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.set("image", file);
      const result = await uploadVehicleImage(form);
      if (result.error) setError(result.error);
      else if (result.url) setImageUrl(result.url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const old = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = ref.current;
    node?.querySelector<HTMLInputElement>("input")?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape" && !pending) onClose();
      if (e.key === "Tab" && node) {
        const items = Array.from(
          node.querySelectorAll<HTMLElement>(
            "button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)",
          ),
        );
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      old?.focus();
    };
  }, [onClose, pending]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const input = {
      ...Object.fromEntries(f),
      featured: f.get("featured") === "on",
    };
    startTransition(async () => {
      try {
        const result = await saveVehicle(vehicle?.id ?? null, input);
        if (result.error) setError(result.error);
        else onSaved();
      } catch {
        setError("Could not save. Please try again.");
      }
    });
  }
  return (
    <div className="modal-backdrop">
      <div
        ref={ref}
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <div className="modal-header">
          <h2 id="editor-title">
            {vehicle ? "Edit vehicle" : "A new addition."}
          </h2>
          <button
            aria-label="Close editor"
            onClick={onClose}
            disabled={pending}
          >
            <X />
          </button>
        </div>
        <form onSubmit={submit} className="admin-form">
          <label>
            Vehicle name
            <input
              name="name"
              defaultValue={data.name}
              required
              maxLength={100}
            />
          </label>
          <label>
            URL slug
            <input
              name="slug"
              defaultValue={data.slug}
              placeholder="mercedes-benz-gle"
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              required
              maxLength={150}
            />
          </label>
          <label>
            Category
            <select name="category" defaultValue={data.category}>
              {["SUV", "Sedan", "Pickup", "Luxury", "Hatchback"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={data.status}>
              {["available", "reserved", "sold"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Description
            <textarea
              name="description"
              rows={4}
              defaultValue={data.description}
              required
              minLength={10}
              maxLength={5000}
            />
          </label>
          <label className="full">
            Vehicle photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={uploading || pending}
              onChange={(e) => upload(e.target.files?.[0])}
            />
            <small>
              {uploading
                ? "Uploading and optimizing…"
                : "JPG, PNG or WebP, up to 5 MB. Stored securely with your database."}
            </small>
          </label>
          <label className="full">
            Image URL
            <input
              name="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <small>Or paste an HTTPS image URL or /media/ path.</small>
          </label>
          <label>
            Price in TZS (leave blank for on request)
            <input
              name="price"
              type="number"
              min={0}
              step={1}
              defaultValue={data.price ?? ""}
            />
          </label>
          <label>
            Model year (optional)
            <input
              name="year"
              type="number"
              min={1900}
              max={new Date().getFullYear() + 2}
              defaultValue={data.year ?? ""}
            />
          </label>
          <label>
            Mileage in km (optional)
            <input
              name="mileage"
              type="number"
              min={0}
              step={1}
              defaultValue={data.mileage ?? ""}
            />
          </label>
          <label>
            Fuel
            <select name="fuel" defaultValue={data.fuel}>
              {["Not specified", "Petrol", "Diesel", "Hybrid", "Electric"].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </label>
          <label>
            Transmission
            <select name="transmission" defaultValue={data.transmission}>
              {["Not specified", "Automatic", "Manual"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={data.featured}
            />{" "}
            Featured in collection
          </label>
          {error && (
            <p className="form-error full" role="alert">
              {error}
            </p>
          )}
          <button className="button full" disabled={pending || uploading}>
            {pending ? (
              <>
                Saving <Loader2 size={16} className="spin" />
              </>
            ) : (
              <>
                Save vehicle <ArrowUpRight size={17} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
